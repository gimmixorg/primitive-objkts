import { useEffect, useState } from 'react';

const useIsElectricObject = () => {
  const [isEO, setEO] = useState(false);
  useEffect(() => {
    setEO(
      window.navigator.userAgent.toLowerCase().includes('electric objects')
    );
  }, []);
  return isEO;
};

export default useIsElectricObject;
