import { useRouter } from 'next/router';

export const useRefresh = () => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return {
    refreshData,
  };
};
