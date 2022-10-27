import { useEffect } from 'react';
import useCheckNotOnboarded from './useCheckNotOnboarded';

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
