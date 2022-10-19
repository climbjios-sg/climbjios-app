import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { GymResponse } from 'src/@types/gym';

export const getGymList = () => authorizedAxios.get<GymResponse[]>(BE_API.gyms);
