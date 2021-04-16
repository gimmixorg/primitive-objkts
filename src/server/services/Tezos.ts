import {
  registerFetch,
  registerLogger,
  ConseilQueryBuilder,
  TezosConseilClient,
  ConseilOperator,
  TezosMessageUtils,
  ConseilSortDirection
} from 'conseiljs';
import * as log from 'loglevel';

const burnAddress = 'tz1burnburnburnburnburnburnburjAYjjX';

const logger = log.getLogger('conseiljs');
logger.setLevel('debug', false);
registerLogger(logger);
registerFetch(fetch);

// signup at nautilus.cloud
const conseilServer = process.env.CONSEIL_SERVER as string;
const conseilApiKey = process.env.CONSEIL_KEY as string;

const mainnet = {
  nftLedger: 511,
  nftMetadataMap: 514,
  protocol: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9'
};

export const getCollectionForAddress = async (address: string) => {
  let collectionQuery = ConseilQueryBuilder.blankQuery();
  collectionQuery = ConseilQueryBuilder.addFields(
    collectionQuery,
    'key',
    'value',
    'operation_group_id'
  );
  collectionQuery = ConseilQueryBuilder.addPredicate(
    collectionQuery,
    'big_map_id',
    ConseilOperator.EQ,
    [mainnet.nftLedger]
  );
  collectionQuery = ConseilQueryBuilder.addPredicate(
    collectionQuery,
    'key',
    ConseilOperator.STARTSWITH,
    [`Pair 0x${TezosMessageUtils.writeAddress(address)}`]
  );
  collectionQuery = ConseilQueryBuilder.addPredicate(
    collectionQuery,
    'value',
    ConseilOperator.EQ,
    [0],
    true
  );
  collectionQuery = ConseilQueryBuilder.setLimit(collectionQuery, 300_000);

  const collectionResult = await TezosConseilClient.getTezosEntityData(
    { url: conseilServer, apiKey: conseilApiKey, network: 'mainnet' },
    'mainnet',
    'big_map_contents',
    collectionQuery
  );
  let collection = collectionResult.map(i => {
    return {
      id: i['key'].toString().replace(/.* ([0-9]{1,}$)/, '$1'),
      opId: i['operation_group_id']
    };
  });

  const queryChunks = chunkArray(
    collection.map(i => i.id),
    50
  ); // NOTE: consider increasing this number somewhat
  const makeObjectQuery = (keys: any[]) => {
    let mintedObjectsQuery = ConseilQueryBuilder.blankQuery();
    mintedObjectsQuery = ConseilQueryBuilder.addFields(
      mintedObjectsQuery,
      'key_hash',
      'value'
    );
    mintedObjectsQuery = ConseilQueryBuilder.addPredicate(
      mintedObjectsQuery,
      'big_map_id',
      ConseilOperator.EQ,
      [mainnet.nftMetadataMap]
    );
    mintedObjectsQuery = ConseilQueryBuilder.addPredicate(
      mintedObjectsQuery,
      'key',
      keys.length > 1 ? ConseilOperator.IN : ConseilOperator.EQ,
      keys
    );
    mintedObjectsQuery = ConseilQueryBuilder.setLimit(
      mintedObjectsQuery,
      keys.length
    );

    return mintedObjectsQuery;
  };

  const objectQueries = queryChunks.map(c => makeObjectQuery(c));
  const objectIpfsMap: Record<string, string> = {};
  await Promise.all(
    objectQueries.map(
      async q =>
        await TezosConseilClient.getTezosEntityData(
          { url: conseilServer, apiKey: conseilApiKey, network: 'mainnet' },
          'mainnet',
          'big_map_contents',
          q
        ).then(result =>
          result.map(row => {
            const objectId: string = row['value']
              .toString()
              .replace(/^Pair ([0-9]{1,}) .*/, '$1');
            const objectUrl: string = row['value']
              .toString()
              .replace(/.* 0x([0-9a-z]{1,}) \}$/, '$1');
            const ipfsHash: string = Buffer.from(objectUrl, 'hex')
              .toString()
              .slice(7);

            objectIpfsMap[objectId] = ipfsHash;
          })
        )
    )
  );

  const operationGroupIds = collectionResult.map(r => r.operation_group_id);
  const priceQueryChunks = chunkArray(operationGroupIds, 30);
  const makeLastPriceQuery = (opIds: any[]) => {
    let lastPriceQuery = ConseilQueryBuilder.blankQuery();
    lastPriceQuery = ConseilQueryBuilder.addFields(
      lastPriceQuery,
      'timestamp',
      'operation_group_hash',
      'parameters_entrypoints',
      'parameters'
    );
    lastPriceQuery = ConseilQueryBuilder.addPredicate(
      lastPriceQuery,
      'kind',
      ConseilOperator.EQ,
      ['transaction']
    );
    lastPriceQuery = ConseilQueryBuilder.addPredicate(
      lastPriceQuery,
      'status',
      ConseilOperator.EQ,
      ['applied']
    );
    lastPriceQuery = ConseilQueryBuilder.addPredicate(
      lastPriceQuery,
      'internal',
      ConseilOperator.EQ,
      ['false']
    );
    lastPriceQuery = ConseilQueryBuilder.addPredicate(
      lastPriceQuery,
      'operation_group_hash',
      opIds.length > 1 ? ConseilOperator.IN : ConseilOperator.EQ,
      opIds
    );
    lastPriceQuery = ConseilQueryBuilder.setLimit(lastPriceQuery, opIds.length);

    return lastPriceQuery;
  };

  const priceQueries = priceQueryChunks.map(c => makeLastPriceQuery(c));
  const priceMap: any = {};
  await Promise.all(
    priceQueries.map(
      async q =>
        await TezosConseilClient.getTezosEntityData(
          { url: conseilServer, apiKey: conseilApiKey, network: 'mainnet' },
          'mainnet',
          'operations',
          q
        ).then(result =>
          result.map(row => {
            priceMap[row.operation_group_hash] = {
              timestamp: row.timestamp
            };
          })
        )
    )
  );

  collection = collection.map(i => {
    let receivedOn = new Date();

    try {
      const priceRecord = priceMap[i.opId];
      receivedOn = new Date(priceRecord.timestamp);
    } catch {
      //
    }

    delete i.opId;

    return {
      receivedOn,
      ipfsHash: objectIpfsMap[i.id.toString()],
      ...i
    };
  });

  const nfts = await Promise.all(
    collection.map(async (objkt: any) => {
      return {
        ...objkt,
        ...(await fetch(
          `https://cloudflare-ipfs.com/ipfs/${objkt.ipfsHash}`
        ).then(res => res.json()))
      };
    })
  );

  return nfts.sort(
    (a: any, b: any) => b.receivedOn.getTime() - a.receivedOn.getTime()
  );
};

const chunkArray = (arr: any[], len: any) => {
  // TODO: move to util.js
  let chunks = [],
    i = 0,
    n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
};

export const getCreationsForAddress = async (address: string) => {
  let mintOperationQuery = ConseilQueryBuilder.blankQuery();
  mintOperationQuery = ConseilQueryBuilder.addFields(
    mintOperationQuery,
    'operation_group_hash'
  );
  mintOperationQuery = ConseilQueryBuilder.addPredicate(
    mintOperationQuery,
    'kind',
    ConseilOperator.EQ,
    ['transaction']
  );
  mintOperationQuery = ConseilQueryBuilder.addPredicate(
    mintOperationQuery,
    'timestamp',
    ConseilOperator.AFTER,
    [1612240919000]
  ); // 2021 Feb 1
  mintOperationQuery = ConseilQueryBuilder.addPredicate(
    mintOperationQuery,
    'status',
    ConseilOperator.EQ,
    ['applied']
  );
  mintOperationQuery = ConseilQueryBuilder.addPredicate(
    mintOperationQuery,
    'destination',
    ConseilOperator.EQ,
    [mainnet.protocol]
  );
  mintOperationQuery = ConseilQueryBuilder.addPredicate(
    mintOperationQuery,
    'parameters_entrypoints',
    ConseilOperator.EQ,
    ['mint_OBJKT']
  );
  mintOperationQuery = ConseilQueryBuilder.addPredicate(
    mintOperationQuery,
    'source',
    ConseilOperator.EQ,
    [address]
  );
  mintOperationQuery = ConseilQueryBuilder.addOrdering(
    mintOperationQuery,
    'block_level',
    ConseilSortDirection.DESC
  );
  mintOperationQuery = ConseilQueryBuilder.setLimit(mintOperationQuery, 256); // TODO: this is hardwired and will not work for highly productive artists

  const mintOperationResult = await TezosConseilClient.getTezosEntityData(
    { url: conseilServer, apiKey: conseilApiKey, network: 'mainnet' },
    'mainnet',
    'operations',
    mintOperationQuery
  );

  const operationGroupIds = mintOperationResult.map(
    r => r['operation_group_hash']
  );
  const queryChunks = chunkArray(operationGroupIds, 30);

  const makeObjectQuery = (opIds: any[]) => {
    let mintedObjectsQuery = ConseilQueryBuilder.blankQuery();
    mintedObjectsQuery = ConseilQueryBuilder.addFields(
      mintedObjectsQuery,
      'key_hash',
      'value'
    );
    mintedObjectsQuery = ConseilQueryBuilder.addPredicate(
      mintedObjectsQuery,
      'big_map_id',
      ConseilOperator.EQ,
      [mainnet.nftMetadataMap]
    );
    mintedObjectsQuery = ConseilQueryBuilder.addPredicate(
      mintedObjectsQuery,
      'operation_group_id',
      opIds.length > 1 ? ConseilOperator.IN : ConseilOperator.EQ,
      opIds
    );
    mintedObjectsQuery = ConseilQueryBuilder.setLimit(
      mintedObjectsQuery,
      opIds.length
    );

    return mintedObjectsQuery;
  };

  const objectQueries = queryChunks.map(c => makeObjectQuery(c));

  const objectInfo = await Promise.all(
    objectQueries.map(
      async q =>
        await TezosConseilClient.getTezosEntityData(
          { url: conseilServer, apiKey: conseilApiKey, network: 'mainnet' },
          'mainnet',
          'big_map_contents',
          q
        ).then(result =>
          result.map(row => {
            const objectId = row['value']
              .toString()
              .replace(/^Pair ([0-9]{1,}) .*/, '$1');
            const objectUrl = row['value']
              .toString()
              .replace(/.* 0x([0-9a-z]{1,}) \}$/, '$1');
            const ipfsHash = Buffer.from(objectUrl, 'hex').toString().slice(7);

            return { key: row['key_hash'], objectId, ipfsHash };
          })
        )
    )
  );

  const collection = objectInfo
    .flat(1)
    .sort((a, b) => parseInt(b.objectId) - parseInt(a.objectId));

  const filtered: {
    key: any;
    objectId: any;
    ipfsHash: string;
    owners: Record<string, number>;
  }[] = await _filteredBurnedCreations(collection);

  const nfts = await Promise.all(
    filtered.map(async (objkt: any) => {
      return {
        ...objkt,
        ...(await fetch(
          `https://cloudflare-ipfs.com/ipfs/${objkt.ipfsHash}`
        ).then(res => res.json()))
      };
    })
  );
  return nfts;
};

const _filteredBurnedCreations = async (
  creations: {
    key: any;
    objectId: any;
    ipfsHash: string;
    owners?: Record<string, number>;
    total_amount?: number;
  }[]
) => {
  const validCreations: {
    key: any;
    objectId: any;
    ipfsHash: string;
    owners: Record<string, number>;
    total_amount?: number;
  }[] = [];

  await Promise.all(
    creations.map(async c => {
      const ownerData = await getObjktOwners(c);

      const burnAddrCount = ownerData.owners[burnAddress]
        ? parseInt(ownerData.owners[burnAddress])
        : 0;
      const allIssuesBurned =
        burnAddrCount && burnAddrCount === ownerData.total_amount;

      if (!allIssuesBurned) {
        //@ts-ignore
        validCreations.push(c);
      }
    })
  );

  return validCreations;
};

const getObjktOwners = async (objkt: any) => {
  const owners = await fetch(
    'https://api.better-call.dev/v1/contract/mainnet/KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton/tokens/holders?token_id=' +
      objkt.objectId
  ).then(res => res.json());

  const ownerCountList: string[] = Object.values(owners);
  let total = 0;

  if (ownerCountList.length) {
    total = ownerCountList.reduce<number>((acc: number, i: string) => {
      const owned = parseInt(i);
      return owned > 0 ? acc + owned : acc;
    }, 0);
  }

  return {
    total_amount: total,
    owners
  };
};
