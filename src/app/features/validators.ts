export const validateETH = (address: string) =>
  /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);

export const validateTZ = (address: string) =>
  /^(tz|KT)[0-9a-z]{34}$/i.test(address);
