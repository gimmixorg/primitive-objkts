import { AddressInputType } from '@app/components/AddressTextInputs';
import { useRouter } from 'next/dist/client/router';

const useAddresses = () => {
  const { query } = useRouter();
  if (!query.addresses) return [];
  const addresses = (JSON.parse(
    query.addresses as string
  ) as AddressInputType[]).filter(
    a => validateETH(a.address) || validateTZ(a.address)
  );
  return addresses;
};

export const validateETH = (address: string) =>
  /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);

export const validateTZ = (address: string) =>
  /^(tz1|KT1)[0-9a-z]{33}$/i.test(address);

export default useAddresses;
