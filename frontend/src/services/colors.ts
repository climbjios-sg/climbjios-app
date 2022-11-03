import { BE_API } from '../utils/api';
import authorizedAxios from '../utils/axios/authorizedAxios';
import { Color } from 'src/@types/color';

export const getColors = () => authorizedAxios.get<Color[]>(BE_API.colors);
