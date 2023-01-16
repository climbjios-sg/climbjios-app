// BE_API contains api endpoints we use to query our host backend
export const BE_API = {
  auth: {
    google: '/v1/auth/google',
    refresh: '/v1/auth/refresh',
    telegramRedirect: '/v1/auth/telegram/redirect',
  },
  user: {
    root: '/v1/user',
    uploadImageUrl: '/v1/user/uploadImageUrl',
  },
  boulderingGrades: '/v1/boulderingGrades',
  topRopeGrades: '/v1/topRopeGrades',
  leadClimbingGrades: '/v1/leadClimbingGrades',
  sncsCertfications: '/v1/sncsCertifications',
  pronouns: '/v1/pronouns',
  gyms: {
    root: '/v1/gyms',
    grades: (id: string) => `/v1/gyms/${id}/grades`,
    search: 'v1/gyms/search',
  },
  posts: {
    root: '/v1/posts',
    post: (id: string) => `/v1/posts/${id}`,
    search: '/v1/posts/search',
  },
  betas: {
    root: '/v1/betas',
    beta: (id: string) => `/v1/betas/${id}`,
    creator: (creatorId: string) => `/v1/betas/creator/${creatorId}`,
    uploadVideoUrl: '/v1/betas/videoUploadUrl',
  },
  colors: '/v1/colors',
  walls: '/v1/walls',
};
