import { AuthProviderType } from 'src/@types/auth';

export const authProviderFactory = (type: AuthProviderType) => {
  // Using dynamic import since only one authProvider needs to be loaded
  switch (type) {
    case 'jwt':
      return import('./jwt').then((provider) => provider.jwtAuthProvider);
    default:
      return import('./default').then((provider) => provider.defaultAuthProvider);
  }
};
