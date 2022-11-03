import { useEffect } from 'react';
import useCheckOnboarded from './useCheckOnboarded';

/**
 * Restrict access to onboarded users.
 * Redirect new users to the onboarding page.
 *
 * @example
 *     const FooPage = () => {
 *         useOnboarded();
 *         return <Foo />;
 *     }
 */
const useOnboarded = () => {
  const checkOnboarded = useCheckOnboarded();

  useEffect(() => {
    const callCheckOnboarded = async () => {
      try {
        await checkOnboarded({});
      } catch (error) {
        // Error has been handled by the guard
      }
    };

    callCheckOnboarded();
  }, [checkOnboarded]);
};

export default useOnboarded;
