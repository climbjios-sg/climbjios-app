import { JwtTokenSetResponse } from '../@types/token';
import { BE_API } from 'src/utils/api';
import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { UserResponse } from 'src/@types/user';
import unauthorizedAxios from '../utils/axios/unauthorizedAxios';

export const refreshAccessToken = (refreshToken: string) =>
  unauthorizedAxios.post<JwtTokenSetResponse>(BE_API.auth.refresh, { refreshToken });

export const checkValidity = () => authorizedAxios.head<UserResponse>(BE_API.user.root);
