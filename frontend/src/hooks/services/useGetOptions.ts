import { OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from '../../config';
import { getFormattedCamelCase } from 'src/utils/common';
import useCustomSnackbar from '../useCustomSnackbar';
import useSafeRequest from './useSafeRequest';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Option, OptionResponse } from 'src/@types';

const useGetOptions = <TData extends OptionResponse[], TParams extends any[]>(
  service: (...args: TParams) => Promise<AxiosResponse<TData, any>>,
  options?: Options<AxiosResponse<TData>, TParams>,
  plugins?: Plugin<AxiosResponse<TData>, TParams>[]
) => {
  const { enqueueError } = useCustomSnackbar();
  const { data, ...rest } = useSafeRequest(
    service,
    {
      // Caches successful data
      cacheTime: OPTIONS_CACHE_TIME,
      staleTime: OPTIONS_STALE_TIME,
      cacheKey: service.name,
      onError: () => {
        enqueueError(`Failed to ${getFormattedCamelCase(service.name)}.`);
      },
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
