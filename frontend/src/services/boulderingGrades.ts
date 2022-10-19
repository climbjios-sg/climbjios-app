import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { BoulderingGradeResponse } from 'src/@types/boulderingGrade';

export const getBoulderingGradesList = () =>
  authorizedAxios.get<BoulderingGradeResponse[]>(BE_API.boulderingGrades);
