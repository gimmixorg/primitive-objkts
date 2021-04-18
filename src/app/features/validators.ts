export const validateETH = (address: string) =>
  /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);

export const validateTZ = (address: string) =>
  /^(tz1|KT1)[0-9a-z]{33}$/i.test(address);
