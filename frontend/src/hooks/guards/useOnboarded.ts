import { useEffect } from 'react';
import useCheckOnboarded from './useCheckOnboarded';

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
