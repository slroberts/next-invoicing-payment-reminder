import { useRefresh } from '../utils/useRefresh';

export const useFetch = (method: string, url: string, data?: {}) => {
  const { refreshData } = useRefresh();

  const fetcher = async () => {
    try {
      await fetch(window.location.origin + url, {
        method: method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  return { fetcher };
};
