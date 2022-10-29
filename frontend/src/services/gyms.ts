import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { GymGrade, GymResponse } from 'src/@types/gym';

export const getGymGrades = (id: string) => authorizedAxios.get<GymGrade[]>(BE_API.gyms.grades(id));

export const getGymList = () => authorizedAxios.get<GymResponse[]>(BE_API.gyms.root);
