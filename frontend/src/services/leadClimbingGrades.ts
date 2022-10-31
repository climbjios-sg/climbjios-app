import authorizedAxios from 'src/utils/axios/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { LeadClimbingGradeResponse } from 'src/@types/leadClimbingGrade';

export const getLeadClimbingGradeList = () =>
  authorizedAxios.get<LeadClimbingGradeResponse[]>(BE_API.leadClimbingGrades);
