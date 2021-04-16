import useSWR from 'swr';

export type NFTOpenSea = {
  id: number;
  image_url: string;
  name: string;
  description: string;
  owner: {
    user: {
      username: string;
    };
    address: string;
    profile_img_url: string;
  };
};

const useOpenSeaAPI = (address: string) => {
  const { data } = useSWR<{ assets: NFTOpenSea[] }>(
    address
      ? `https://api.opensea.io/api/v1/assets?owner=${address}&format=json&limit=10&order_direction=desc&order_by=token_id`
      : null,
    {
      dedupingInterval: 60 * 60 * 1000,
      refreshInterval: 60 * 60 * 1000
    }
  );
  const { assets } = data || { assets: [] };
  return assets;
};

export default useOpenSeaAPI;
