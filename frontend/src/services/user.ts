import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { RequestUser, ResponseUser } from 'src/@types/user';

export const getUser = () => authorizedAxios.get<ResponseUser>(BE_API.user);

// TODO: refactor type names
export const updateUser = (user: RequestUser) =>
  authorizedAxios.patch<ResponseUser>(BE_API.user, {
    name: user.name,
    username: user.username,
    telegramHandle: user.telegramHandle,
  });

export const createUser = (user: RequestUser) =>
  authorizedAxios.patch<ResponseUser>(BE_API.user, {
    name: user.name,
    username: user.username,
    telegramHandle: user.telegramHandle,
  });
