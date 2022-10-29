import useSafeRequest from '../useSafeRequest';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Option, OptionResponse } from 'src/@types';
import { OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';

const useGetOptions = <TData extends OptionResponse[], TParams extends any[]>(
  service: (...args: TParams) => Promise<AxiosResponse<TData, any>>,
  options?: Options<AxiosResponse<TData>, TParams>,
  plugins?: Plugin<AxiosResponse<TData>, TParams>[]
) => {
  const { data, ...rest } = useSafeRequest(
    service,
    {
      cacheTime: OPTIONS_CACHE_TIME,
      staleTime: OPTIONS_STALE_TIME,
      ...options,
    },
    plugins
  );

  const res: Option[] =
    data?.data.map((option) => ({
      value: option.id,
      label: option.name,
    })) ?? [];

  return {
    data: res,
    ...rest,
  };
};

export default useGetOptions;
