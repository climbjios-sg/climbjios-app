import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { SncsCertificationResponse } from 'src/@types/sncsCertfications';

export const getSncsCertificationList = () =>
  authorizedAxios.get<SncsCertificationResponse[]>(BE_API.sncsCertfications);
