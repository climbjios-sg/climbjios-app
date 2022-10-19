import { BE_API } from 'src/utils/api';
import { BetaUploadUrlData } from '../@types/beta';
import authorizedAxios from '../utils/authorizedAxios';

export const getUploadUrl = () => authorizedAxios.get<BetaUploadUrlData>(BE_API.betas.uploadVideoUrl);

