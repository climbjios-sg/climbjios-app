// BE_API contains api endpoints we use to query our host backend
export const BE_API = {
  auth: {
    google: '/v1/auth/google',
  },
  user: '/v1/user',
  gyms: '/v1/gyms',
  posts: {
    create: '/v1/posts',
    search: '/v1/posts/search',
  },
};
