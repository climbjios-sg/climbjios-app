import { useRequest } from 'ahooks';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useAuthProvider from '../auth/useAuthProvider';
import useLogout from '../auth/useLogout';

const useSafeRequest = <TData, TParams extends any[]>(
  service: (...args: TParams) => Promise<AxiosResponse<TData, any>>,
  options?: Options<AxiosResponse<TData>, TParams>,
  plugins?: Plugin<AxiosResponse<TData>, TParams>[]
) => {
  const { data, refreshAsync, ...rest } = useRequest(service, options, plugins);
  const logout = useLogout();
  const { login, checkError } = useAuthProvider();

  useEffect(() => {
    const callCheckError = async () => {
      if (!data?.status) {
        return;
      }

      try {
        await checkError(data.status);
      } catch {
        try {
          await login();
          refreshAsync();
        } catch {
          logout();
        }
      }
    };
    callCheckError();
  }, [checkError, data?.status, login, logout, refreshAsync]);

  return { data, refreshAsync, ...rest };
};

export default useSafeRequest;
