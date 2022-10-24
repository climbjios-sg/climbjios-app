import { TabValue } from '../pages/dashboard/jios/list';

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/login';
const ROOTS_ONBOARDING = '/onboarding';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_USER = '/user';

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
};

export const PATH_PAGE = {
  page404: '/404',
  updateTelegramUsername: '/updateTelegramUsername',
};

export const PATH_ONBOARDING = {
  root: ROOTS_ONBOARDING,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    jios: {
      root: path(ROOTS_DASHBOARD, '/jios'),
      userJios: path(ROOTS_DASHBOARD, `/jios?tab=${TabValue.MyJios}`),
      search: path(ROOTS_DASHBOARD, '/jios/search'),
      create: path(ROOTS_DASHBOARD, '/jios/create'),
      edit: path(ROOTS_DASHBOARD, '/jios/edit'),
    },
    profile: path(ROOTS_DASHBOARD, '/profile'),
    beta: {
      root: path(ROOTS_DASHBOARD, '/beta'),
      create: path(ROOTS_DASHBOARD, '/beta/create'),
      gym: (gymId: string) => path(ROOTS_DASHBOARD, `/beta/${gymId}`),
    },
  },
};

export const PATH_USER = {
  root: ROOTS_USER,
  general: {
    user: (userId: string) => path(ROOTS_USER, `/${userId}`),
  },
};
