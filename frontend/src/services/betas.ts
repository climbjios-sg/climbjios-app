import {
  Beta,
  ListBetasResponse,
  ListBetasRequest,
  BetaUploadUrlResponse,
  CreateBetaRequest,
} from '../@types/beta';
import { AxiosResponse } from 'axios';
import { BE_API } from 'src/utils/api';
import plainAxios from '../utils/axios/plainAxios';
import authorizedAxios from '../utils/axios/authorizedAxios';

export const getBetas = (params: ListBetasRequest) =>
  authorizedAxios.get<ListBetasResponse>(BE_API.betas.root, {
    params,
  });

export const getCreatorBetas = (creatorId: string, params: ListBetasRequest) =>
  authorizedAxios.get<ListBetasResponse>(BE_API.betas.creator(creatorId), {
    params,
  });

export const deleteBeta = (betaId: string) =>
  authorizedAxios.delete(BE_API.betas.beta.root(betaId));

export const getBetaUploadUrl = () =>
  authorizedAxios.get<BetaUploadUrlResponse>(BE_API.betas.uploadVideoUrl);

export const createBeta = (beta: CreateBetaRequest) =>
  authorizedAxios.post<CreateBetaRequest, AxiosResponse<Beta>>(BE_API.betas.root, beta);

export const likeBeta = (betaId: string) => authorizedAxios.post(BE_API.betas.beta.like(betaId));

export const uploadBetaVideoToCloudfare = async (video: File) => {
  const {
    data: { cloudflareUploadUrl, cloudflareVideoUid },
  } = await getBetaUploadUrl();
  const formData = new FormData();
  formData.append('file', video);
  await plainAxios.post(cloudflareUploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return cloudflareVideoUid;
};
