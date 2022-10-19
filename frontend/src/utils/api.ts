import { ApiUser, User } from 'src/@types/user';
// BE_API contains api endpoints we use to query our host backend
export const BE_API = {
  auth: {
    google: '/v1/auth/google',
    refresh: '/v1/auth/refresh',
    telegramRedirect: '/v1/auth/telegram/redirect',
  },
  user: '/v1/user',
  gyms: {
    root: '/v1/gyms',
    grades: (id: string) => `/v1/gyms/${id}/grades`,
  },
  posts: {
    root: '/v1/posts',
    search: '/v1/posts/search',
  },
  betas: {
    root: '/v1/betas',
    user: (userId: string) => `/v1/betas/${userId}`,
    uploadVideoUrl: '/v1/betas/videoUploadUrl',
  },
  colors: '/v1/colors',
  walls: '/v1/walls',
};

// apiUserToUser converts User object fetched from be api to user object used in fe
export const apiUserToUser = (apiUser: ApiUser): User => ({
  id: apiUser.id,
  name: apiUser.name,
  username: apiUser.username,
  telegramHandle: apiUser.telegramHandle,
});

// userToApiUser converts User to ApiUser
export const userToApiUser = (user: User): ApiUser => ({
  name: user.name,
  username: user.username,
  telegramHandle: user.telegramHandle,
});
