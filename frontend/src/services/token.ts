import { JwtTokenSetResponse } from '../@types/token';
import { BE_API } from 'src/utils/api';
import { HOST_API } from '../config';
import authorizedAxios, { baseAxios } from 'src/utils/authorizedAxios';
import { UserResponse } from 'src/@types/user';

export const refreshAccessToken = (refreshToken: string) =>
  baseAxios.post<JwtTokenSetResponse>(`${HOST_API}${BE_API.auth.refresh}`, { refreshToken });

export const checkValidity = () => authorizedAxios.head<UserResponse>(BE_API.user.root);
