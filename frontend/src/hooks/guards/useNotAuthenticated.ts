import { useEffect } from 'react';
import useCheckNotAuth from './useCheckNotAuth';

/**
 * Restrict access to anonymous users.
 * Redirect authenticated users to the dashboard page.
 *
 * @example
 *     const FooPage = () => {
 *         useNotAuthenticated();
 *         return <Foo />;
 *     }
 */
const useNotAuthenticated = () => {
  const checkNotAuth = useCheckNotAuth();

  useEffect(() => {
    const callCheckNotAuth = async () => {
      try {
        await checkNotAuth({});
      } catch (error) {
        // Error has been handled by the guard
      }
    };

    callCheckNotAuth();
  }, [checkNotAuth]);
};

export default useNotAuthenticated;
