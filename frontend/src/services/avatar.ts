import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';

export const getUploadAvatarUrl = () => authorizedAxios.get<string>(BE_API.uploadImageUrl);
export const uploadAvatar = (url: string, image: File & { preview: string }) =>
  authorizedAxios.post(url, image);
