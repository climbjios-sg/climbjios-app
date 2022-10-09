import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { Jio } from 'src/@types/jio';
import { JioFormValues } from 'src/pages/dashboard/jios/JiosForm';

export const createJio = (data: JioFormValues) =>
  authorizedAxios.post<Jio>(BE_API.posts.root, data);

export const updateJio = (data: Partial<JioFormValues>, id: number) =>
  authorizedAxios.patch<Jio>(`${BE_API.posts.root}/${id}`, data);
