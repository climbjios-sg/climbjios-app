import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { UserRequest, UserResponse } from 'src/@types/user';

export const getUser = () => authorizedAxios.get<UserResponse>(BE_API.user);

export const updateUser = (user: UserRequest) =>
  authorizedAxios.patch<UserResponse>(BE_API.user, {
    name: user.name,
    username: user.username,
    telegramHandle: user.telegramHandle,
  });

export const createUser = (user: UserRequest) =>
  authorizedAxios.patch<UserResponse>(BE_API.user, {
    name: user.name,
    username: user.username,
    telegramHandle: user.telegramHandle,
  });
