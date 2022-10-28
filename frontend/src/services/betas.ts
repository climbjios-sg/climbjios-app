import {
  Beta,
  ListBetasResponse,
  ListBetasRequest,
  BetaUploadUrlResponse,
  CreateBetaRequest,
} from '../@types/beta';
import axios, { AxiosResponse } from 'axios';
import { BE_API } from 'src/utils/api';
import authorizedAxios from '../utils/authorizedAxios';

export const getBetas = (params: ListBetasRequest) =>
  authorizedAxios.get<ListBetasResponse>(BE_API.betas.root, {
    params,
  });

export const getCreatorBetas = (creatorId: string, params: ListBetasRequest) =>
  authorizedAxios.get<ListBetasResponse>(BE_API.betas.creator(creatorId), {
    params,
  });

export const deleteBeta = (betaId: string) => authorizedAxios.delete(BE_API.betas.beta(betaId));

export const getBetaUploadUrl = () =>
  authorizedAxios.get<BetaUploadUrlResponse>(BE_API.betas.uploadVideoUrl);

export const postCreateBeta = (beta: CreateBetaRequest) =>
  authorizedAxios.post<CreateBetaRequest, AxiosResponse<Beta>>(BE_API.betas.root, beta);

export const uploadBetaVideoToCloudfare = async (video: File) => {
  const {
    data: { cloudflareUploadUrl, cloudflareVideoUid },
  } = await getBetaUploadUrl();
  const formData = new FormData();
  formData.append('file', video);
  await axios.post(cloudflareUploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return cloudflareVideoUid;
};
