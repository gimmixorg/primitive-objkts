import { useEffect, useState } from 'react';
import { NFTOpenSea } from './useOpenSeaAPI';
import { NFTHicEtNunc } from './useHicEtNunc';
import useConfig from './useConfig';

const useSlideshow = (
  collection: Array<NFTOpenSea | NFTHicEtNunc>,
  turn: number,
  onComplete: () => void
) => {
  const [index, setIndex] = useState(0);
  const nft = collection?.[index];
  const { time, unit, mode } = useConfig();

  useEffect(() => {
    if (mode == 'ordered') setIndex(0);
    else if (mode == 'random')
      setIndex(Math.floor(Math.random() * collection.length));
  }, [collection?.length, turn, mode]);

  useEffect(() => {
    const timeout = setTimeout(
      () => advanceToNext(),
      time * (unit == 's' ? 1000 : unit == 'h' ? 60 * 60 * 1000 : 60 * 1000)
    );
    return () => clearTimeout(timeout);
  }, [index, collection?.length]);

  const advanceToNext = () => {
    if (mode == 'ordered') {
      if (index + 1 >= collection.length) return onComplete();
      setIndex(index => index + 1);
    } else if (mode == 'random') {
      return onComplete();
    }
  };

  return { nft, advanceToNext };
};

export default useSlideshow;
