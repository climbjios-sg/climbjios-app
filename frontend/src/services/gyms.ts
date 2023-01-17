import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { GymGrade, GymResponse } from 'src/@types/gym';
import { GymsSearchResponse } from 'src/@types/gymGroup';

export const getGymGrades = (id: string) => authorizedAxios.get<GymGrade[]>(BE_API.gyms.grades(id));

export const getGymList = () => authorizedAxios.get<GymResponse[]>(BE_API.gyms.root);

export const searchGyms = () => authorizedAxios.get<GymsSearchResponse>(BE_API.gyms.search);
