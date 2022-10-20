import { AuthProvider, AuthProviderType } from 'src/@types/auth';

export const authProviderFactory = (type: AuthProviderType): Promise<AuthProvider> => {
  // Uses dynamic import to reduce overhead
  switch (type) {
    case 'jwt':
      return import('./jwt').then((provider) => provider.jwtAuthProvider);
    default:
      return import('./jwt').then((provider) => provider.jwtAuthProvider);
  }
};
