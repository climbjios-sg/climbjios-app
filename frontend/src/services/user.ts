import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { UserIdentity } from 'src/@types/auth';

export const getUserIdentity = () => authorizedAxios.get<UserIdentity>(BE_API.user);
