import { RequestJio, Jio } from '../@types/jio';
import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';

export const getJio = (id: number) => authorizedAxios.get<Jio>(`${BE_API.posts.root}/${id}`);

export const createJio = (data: RequestJio) =>
  authorizedAxios.post<RequestJio>(BE_API.posts.root, data);

export const updateJio = (data: RequestJio, id: number) =>
  authorizedAxios.patch<RequestJio>(`${BE_API.posts.root}/${id}`, data);
