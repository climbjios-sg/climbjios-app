import { AuthProviderType } from 'src/@types/auth';

export const authProviderFactory = async (type: AuthProviderType) => {
  switch (type) {
    default:
      return import('./jwt').then((provider) => provider.jwtAuthProvider);
  }
};
