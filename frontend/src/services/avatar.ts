import authorizedAxios from 'src/utils/axios/authorizedAxios';
import plainAxios from "src/utils/axios/plainAxios";
import { BE_API } from 'src/utils/api';

export const getUploadAvatarUrl = () => authorizedAxios.get<string>(BE_API.user.uploadImageUrl);
export const uploadAvatar = (url: string, image: File) => {
  let data = new FormData();
  data.append('file', image, image.name);

  return plainAxios.put(url, image, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
};
