import { TabValue } from '../pages/dashboard/jios/list';

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/login';
const ROOTS_ONBOARDING = '/onboarding';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_CLIMBER = '/climber';

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
    profile: {
      root: path(ROOTS_DASHBOARD, '/profile'),
      edit: path(ROOTS_DASHBOARD, '/profile/edit'),
    },
    betas: {
      root: path(ROOTS_DASHBOARD, '/betas'),
      create: (gymId?: number | string) =>
        path(ROOTS_DASHBOARD, `/betas/create${gymId ? `?gymId=${gymId}` : ''}`),
    },
  },
};

export const PATH_USER = {
  root: ROOTS_CLIMBER,
  general: {
    user: (userId: string) => path(ROOTS_CLIMBER, `/${userId}`),
  },
};
