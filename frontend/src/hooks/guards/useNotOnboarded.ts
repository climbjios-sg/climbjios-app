import { useEffect } from 'react';
import useCheckNotOnboarded from './useCheckNotOnboarded';

/**
 * Restrict access to new users.
 * Redirect onboarded users to the dashboard page.
 *
 * @example
 *     const FooPage = () => {
 *         useNotOnboarded();
 *         return <Foo />;
 *     }
 */
const useNotOnboarded = () => {
  const checkNotOnboarded = useCheckNotOnboarded();

  useEffect(() => {
    const callCheckNotOnboarded = async () => {
      try {
        await checkNotOnboarded({});
      } catch (error) {
        // Error has been handled by the guard
      }
    };

    callCheckNotOnboarded();
  }, [checkNotOnboarded]);
};

export default useNotOnboarded;
