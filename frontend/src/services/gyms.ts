import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { Gym, GymGrade } from 'src/@types/gym';

export const getGymList = () => authorizedAxios.get<Gym[]>(BE_API.gyms.root);

export const getGymGrades = (id: string) =>
  authorizedAxios.get<GymGrade[]>(BE_API.gyms.grades(id));
