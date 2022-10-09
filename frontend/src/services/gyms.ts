import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { Gym } from 'src/@types/gym';

export const getGymList = () => authorizedAxios.get<Gym[]>(BE_API.gyms);
