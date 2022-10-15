import { JioRequest, Jio, JioResponse, GetJioListRequest } from '../@types/jio';
import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';

export const getJioList = (searchParams: GetJioListRequest) =>
  authorizedAxios.get<Jio[]>(BE_API.posts.search, {
    params: searchParams,
  });

export const getJio = (id: number) =>
  authorizedAxios.get<JioResponse>(`${BE_API.posts.root}/${id}`);

export const createJio = (data: JioRequest) =>
  authorizedAxios.post<JioResponse>(BE_API.posts.root, data);

export const updateJio = (data: JioRequest, id: number) =>
  authorizedAxios.patch<JioResponse>(`${BE_API.posts.root}/${id}`, data);
