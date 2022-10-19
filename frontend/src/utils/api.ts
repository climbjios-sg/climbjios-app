// BE_API contains api endpoints we use to query our host backend
export const BE_API = {
  auth: {
    google: '/v1/auth/google',
    refresh: '/v1/auth/refresh',
    telegramRedirect: '/v1/auth/telegram/redirect',
  },
  user: '/v1/user',
  gyms: '/v1/gyms',
  boulderingGrades: '/v1/boulderingGrades',
  topRopeGrades: '/v1/topRopeGrades',
  leadClimbingGrades: '/v1/leadClimbingGrades',
  sncsCertfications: '/v1/sncsCertfications',
  pronouns: '/v1/pronouns',
  posts: {
    root: '/v1/posts',
    search: '/v1/posts/search',
  },
};
