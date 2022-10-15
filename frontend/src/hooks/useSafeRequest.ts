import { useRequest } from 'ahooks';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useAuthProvider from './auth/useAuthProvider';
import useLogout from './auth/useLogout';

const useSafeRequest = <TData>(
  service: () => Promise<AxiosResponse<TData, any>>,
  options?: Options<AxiosResponse<TData, any>, []>,
  plugins?: Plugin<AxiosResponse<TData, any>, []>[]
) => {
  const { data, ...rest } = useRequest(service, options, plugins);
  const logout = useLogout();
  const { login, checkError } = useAuthProvider();

  useEffect(() => {
    const callCheckError = async () => {
      if (!data) {
        return;
      }

      try {
        await checkError(data.status);
      } catch {
        try {
          await login({});
        } catch {
          logout();
        }
      }
    };
    callCheckError();
  }, [checkError, data, login, logout]);

  return { data, ...rest };
};

export default useSafeRequest;
