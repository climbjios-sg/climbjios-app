import { TokensResponse } from "../@types/token";
import { BE_API } from 'src/utils/api';
import { HOST_API } from '../config';
import axios from 'axios';

export const refreshAccessToken = (refreshToken: string) =>
  axios.post<TokensResponse>(`${HOST_API}${BE_API.auth.refresh}`, { refreshToken });
