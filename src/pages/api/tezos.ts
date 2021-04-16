import {
  getCollectionForAddress,
  getCreationsForAddress
} from '@server/services/Tezos';
import { NextApiHandler } from 'next';
import { ApiError } from 'next/dist/next-server/server/api-utils';

const api: NextApiHandler = async (req, res) => {
  const { address, type }: { address?: string; type?: string } = req.query;
  if (!address) throw new ApiError(400, 'Missing address.');
  if (type == 'creations') {
    const collection = await getCreationsForAddress(address);
    res.setHeader('Cache-Control', 'stale-while-revalidate=3600');
    return res.json(collection.slice(0, 10));
  } else {
    const collection = await getCollectionForAddress(address);
    res.setHeader('Cache-Control', 'stale-while-revalidate=3600');
    return res.json(collection.slice(0, 10));
  }
};

export default api;
