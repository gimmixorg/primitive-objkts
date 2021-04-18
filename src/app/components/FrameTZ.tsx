import useTezos, { NFTHicEtNunc } from '@app/features/useHicEtNunc';
import useSlideshow from '@app/features/useSlideshow';
import React, { useState } from 'react';
import { AddressInputType } from './AddressTextInputs';
import FrameGenericNFT from './FrameGenericNFT';

const FrameTZ = ({
  user,
  turn,
  onComplete
}: {
  user: AddressInputType;
  turn: number;
  onComplete: () => void;
}) => {
  const collection = useTezos(user);
  const { nft: _nft, advanceToNext } = useSlideshow(
    collection,
    turn,
    onComplete
  );
  const [tryingAlt, setTryingAlt] = useState(false);
  const onFail = () => {
    if (tryingAlt) {
      setTryingAlt(false);
      advanceToNext();
    } else {
      setTryingAlt(true);
    }
  };
  const nft = _nft as NFTHicEtNunc;
  if (!nft) return null;
  return (
    <FrameGenericNFT
      user={user}
      image={(!tryingAlt ? nft.artifactUri : nft.thumbnailUri).replace(
        'ipfs://',
        'https://cloudflare-ipfs.com/ipfs/'
      )}
      name={nft.name}
      description={nft.description}
      advanceToNext={onFail}
    />
  );
};

export default React.memo(FrameTZ);
