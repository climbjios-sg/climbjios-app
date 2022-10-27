import { useRequest } from 'ahooks';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useAuthProvider from '../auth/useAuthProvider';
import useLogout from '../auth/useLogout';

/**
 * This useRequest wrapper logs the user out
 * if the response status indicates Unauthorized or Forbidden access
 */
const useSafeRequest = <TData, TParams extends any[]>(
  service: (...args: TParams) => Promise<AxiosResponse<TData, any>>,
  options?: Options<AxiosResponse<TData>, TParams>,
  plugins?: Plugin<AxiosResponse<TData>, TParams>[]
) => {
  const { data, ...rest } = useRequest(service, options, plugins);
  const logout = useLogout();
  const authProvider = useAuthProvider();

  useEffect(() => {
    const callCheckError = async () => {
      if (!data?.status) {
        return;
      }

      try {
        await authProvider.checkError(data.status);
      } catch {
        logout();
      }
    };
    callCheckError();
  }, [authProvider, data?.status, logout]);

  return { data, ...rest };
};

export default useSafeRequest;
