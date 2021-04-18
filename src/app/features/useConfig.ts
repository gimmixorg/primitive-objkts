import { AddressInputType } from '@app/components/AddressTextInputs';
import { useRouter } from 'next/dist/client/router';
import { validateETH, validateTZ } from './validators';

type Config = {
  addresses: AddressInputType[];
  mode: 'ordered' | 'random';
  time: number;
  unit: 's' | 'm' | 'h';
};

const useConfig = (): Config => {
  const { query } = useRouter();
  if (!query?.c)
    return {
      addresses: [],
      time: 0,
      mode: 'ordered',
      unit: 'm'
    };
  const config: Config = JSON.parse(query.c as string);
  let { addresses, mode, time, unit } = config;
  addresses = addresses.filter(
    a => validateETH(a.address) || validateTZ(a.address)
  );

  return { addresses, mode, time, unit };
};

export default useConfig;
