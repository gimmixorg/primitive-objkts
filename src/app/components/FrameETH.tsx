import useOpenSeaAPI, { NFTOpenSea } from '@app/features/useOpenSeaAPI';
import useSlideshow from '@app/features/useSlideshow';
import React from 'react';
import { AddressInputType } from './AddressTextInputs';
import FrameGenericNFT from './FrameGenericNFT';

const FrameETH = ({
  user,
  turn,
  onComplete
}: {
  user: AddressInputType;
  turn: number;
  onComplete: () => void;
}) => {
  const collection = useOpenSeaAPI(user.address);
  const { nft: _nft, advanceToNext } = useSlideshow(
    collection,
    turn,
    onComplete
  );
  const nft = _nft as NFTOpenSea;
  if (!nft) return null;
  return (
    <FrameGenericNFT
      image={nft.image_url}
      name={nft.name}
      description={nft.description}
      advanceToNext={advanceToNext}
    />
  );
};

export default React.memo(FrameETH);
