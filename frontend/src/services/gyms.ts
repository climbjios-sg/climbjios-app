import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { ResponseGym } from 'src/@types/gym';

export const getGymList = () => authorizedAxios.get<ResponseGym[]>(BE_API.gyms);
