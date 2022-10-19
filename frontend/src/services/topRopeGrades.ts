import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { TopRopeGradeResponse } from 'src/@types/topRopeGrade';

export const getTopRopeGradeList = () =>
  authorizedAxios.get<TopRopeGradeResponse[]>(BE_API.topRopeGrades);
