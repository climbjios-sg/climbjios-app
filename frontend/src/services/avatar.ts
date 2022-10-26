import authorizedAxios, { baseAxios } from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';

export const getUploadAvatarUrl = () => authorizedAxios.get<string>(BE_API.user.uploadImageUrl);
export const uploadAvatar = (url: string, image: File) => {
  let data = new FormData();
  data.append('file', image, image.name);

  return baseAxios.put(url, image, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
};
