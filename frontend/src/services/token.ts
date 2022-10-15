import { ResponseJwtTokenSet } from '../@types/token';
import { BE_API } from 'src/utils/api';
import { HOST_API } from '../config';
import axios from 'axios';

export const refreshAccessToken = (refreshToken: string) =>
  axios.post<ResponseJwtTokenSet>(`${HOST_API}${BE_API.auth.refresh}`, { refreshToken });
