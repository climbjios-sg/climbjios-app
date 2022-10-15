import { RequestJio, Jio, ResponseJio } from '../@types/jio';
import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { ListJiosArgs } from 'src/store/reducers/jios';

export const getJioList = (searchParams: ListJiosArgs) =>
  authorizedAxios.get<Jio[]>(BE_API.posts.search, {
    params: searchParams,
  });

export const getJio = (id: number) =>
  authorizedAxios.get<ResponseJio>(`${BE_API.posts.root}/${id}`);

export const createJio = (data: RequestJio) =>
  authorizedAxios.post<ResponseJio>(BE_API.posts.root, data);

export const updateJio = (data: RequestJio, id: number) =>
  authorizedAxios.patch<ResponseJio>(`${BE_API.posts.root}/${id}`, data);
