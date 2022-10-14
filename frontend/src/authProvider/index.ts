export const authProviderFactory = async (type: 'jwt') => {
  switch (type) {
    default:
      return import('./jwt').then((provider) => provider.jwtAuthProvider);
  }
};
