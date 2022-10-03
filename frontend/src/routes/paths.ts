// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_ONBOARDING = '/onboarding';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
  page404: '/404',
};

export const PATH_ONBOARDING = {
  profile: path(ROOTS_ONBOARDING, '/profile'),
  // notionStepOne: path(ROOTS_ONBOARDING, '/notionstepone'),
  // notionStepTwo: path(ROOTS_ONBOARDING, '/notion'),
  username: path(ROOTS_ONBOARDING, '/username'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
