import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { GymGrade, GymResponse } from 'src/@types/gym';
import { GymsSearchResponse } from 'src/@types/gymGroup';
import { GymDetails } from 'src/@types/gymDetails';
import { GymPasses } from 'src/@types/gymPasses';

export const getGymGrades = (id: string) => authorizedAxios.get<GymGrade[]>(BE_API.gyms.grades(id));

export const getGymList = () => authorizedAxios.get<GymResponse[]>(BE_API.gyms.root);

export const searchGyms = (substring?: string) =>
  authorizedAxios.get<GymsSearchResponse>(BE_API.gyms.search(substring));

export const getGymDetails = (id: number) =>
  authorizedAxios.get<GymDetails>(BE_API.gyms.details(id));

  export const getGymPasses = (id: number) =>
    authorizedAxios.get<GymPasses>(BE_API.gyms.passes(id));
