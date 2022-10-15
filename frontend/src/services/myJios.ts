import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { Jio } from 'src/@types/jio';

export const getMyJios = () => authorizedAxios.get<Jio[]>(BE_API.posts.root);

export const closeMyJio = (id: number) =>
  authorizedAxios.patch<Jio>(`${BE_API.posts.root}/${id}`, {
    isClosed: true,
  });
