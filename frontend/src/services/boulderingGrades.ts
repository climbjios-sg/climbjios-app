import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { BoulderingGradesResponse } from 'src/@types/boulderingGrade';

export const getBoulderingGradesList = () =>
  authorizedAxios.get<BoulderingGradesResponse[]>(BE_API.boulderingGrades);
