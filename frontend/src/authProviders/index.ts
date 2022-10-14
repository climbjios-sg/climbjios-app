import { AuthProviderType } from 'src/@types/auth';

export const authProviderFactory = (type: AuthProviderType) => {
  switch (type) {
    case 'jwt':
      return import('./jwt').then((provider) => provider.jwtAuthProvider);
    default:
      return import('./default').then((provider) => provider.defaultAuthProvider);
  }
};
