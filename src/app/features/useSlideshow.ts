import { useEffect, useState } from 'react';
import { NFTOpenSea } from './useOpenSeaAPI';
import { NFTHicEtNunc } from './useHicEtNunc';
import useTimerSetting from './useTimerSetting';

const useSlideshow = (
  collection: Array<NFTOpenSea | NFTHicEtNunc>,
  turn: number,
  onComplete: () => void
) => {
  const [index, setIndex] = useState(0);
  const nft = collection?.[index];
  const TIMER = useTimerSetting();
  useEffect(() => {
    setIndex(0);
  }, [collection?.length, turn]);

  useEffect(() => {
    const timeout = setTimeout(() => advanceToNext(), TIMER);
    return () => clearTimeout(timeout);
  }, [index, collection?.length]);

  const advanceToNext = () => {
    if (index + 1 >= collection.length) return onComplete();
    setIndex(index => index + 1);
  };

  return { nft, advanceToNext };
};

export default useSlideshow;
