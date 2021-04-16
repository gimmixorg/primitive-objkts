import { AddressInputType } from '@app/components/AddressTextInputs';
import useSWR from 'swr';

export type NFTHicEtNunc = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  symbol: string;
  artifactUri: string;
  displayUri: string;
  thumbnailUri: string;
  creators: string[];
  formats: Format[];
};

type Format = {
  uri: string;
  mimeType: string;
};

const useHicEtNunc = (user: AddressInputType) => {
  const { data } = useSWR<NFTHicEtNunc[]>(
    user ? `/api/tezos?address=${user.address}&type=${user.type}` : null,
    {
      dedupingInterval: 60 * 60 * 1000,
      refreshInterval: 60 * 60 * 1000
    }
  );
  return data || [];
};

export default useHicEtNunc;
