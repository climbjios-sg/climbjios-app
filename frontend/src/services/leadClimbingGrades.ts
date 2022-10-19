import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { LeadClimbingGradesResponse } from 'src/@types/leadClimbingGrade';

export const getLeadClimbingGradeList = () =>
  authorizedAxios.get<LeadClimbingGradesResponse[]>(BE_API.leadClimbingGrades);
