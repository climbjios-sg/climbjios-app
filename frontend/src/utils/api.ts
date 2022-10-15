// BE_API contains api endpoints we use to query our host backend
export const BE_API = {
  auth: {
    google: '/v1/auth/google',
    refresh: '/v1/auth/refresh',
    telegramRedirect: '/v1/auth/telegram/redirect',
  },
  user: '/v1/user',
  gyms: '/v1/gyms',
  posts: {
    root: '/v1/posts',
    search: '/v1/posts/search',
  },
};
