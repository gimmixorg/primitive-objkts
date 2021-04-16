import { useRouter } from 'next/dist/client/router';

const DEFAULT_TIMER = 5 * 1000;

const useTimerSetting = () => {
  const { query } = useRouter();

  const TIMER = query.timer
    ? parseFloat(query.timer as string) *
      (query.timer.includes('h')
        ? 60 * 60 * 1000
        : query.timer.includes('m')
        ? 60 * 1000
        : 1000)
    : DEFAULT_TIMER;

  return TIMER;
};

export default useTimerSetting;
