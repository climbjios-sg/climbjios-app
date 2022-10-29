import { JioRequest, JioResponse, GetJioListRequest } from '../@types/jio';
import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { BE_API } from 'src/utils/api';
import unauthorizedAxios from '../utils/axios/unauthorizedAxios';

export const getJioList = (searchParams: GetJioListRequest) =>
  authorizedAxios.get<JioResponse[]>(BE_API.posts.search, {
    params: searchParams,
  });

export const getJio = (id: string) =>
  unauthorizedAxios.get<JioResponse>(BE_API.posts.post(id))

export const createJio = (data: JioRequest) =>
  authorizedAxios.post<JioResponse>(BE_API.posts.root, data);

export const updateJio = (data: JioRequest, id: string) =>
  authorizedAxios.patch<JioResponse>(BE_API.posts.post(id), data);
