import useSafeRequest from '../useSafeRequest';
import { Options, Plugin } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Option, OptionResponse } from 'src/@types';

const useGetOptions = <TData extends OptionResponse[], TParams extends any[]>(
  service: (...args: TParams) => Promise<AxiosResponse<TData, any>>,
  options?: Options<AxiosResponse<TData>, TParams>,
  plugins?: Plugin<AxiosResponse<TData>, TParams>[]
) => {
  const { data, ...rest } = useSafeRequest(service, options, plugins);

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
