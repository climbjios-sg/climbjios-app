import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

/**
 * Restrict access to authenticated users.
 * Redirect anonymous users to the login page.
 *
 * Use it in your custom page components to require
 * authentication.
 *
 * @example
 *     const FooPage = () => {
 *         useAuthenticated();
 *         return <Foo />;
 *     }
 */
const useAuthenticated = () => {
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        await checkAuth({});
      } catch (error) {
        // Error has been handled by the guard
      }
    };

    callCheckAuth();
  }, [checkAuth]);
};

export default useAuthenticated;
