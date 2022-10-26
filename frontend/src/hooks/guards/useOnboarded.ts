import { useEffect } from 'react';
import useCheckOnboarded from './useCheckOnboarded';

const useOnboarded = () => {
  const checkOnboarded = useCheckOnboarded();

  useEffect(() => {
    const callCheckOnboarded = async () => {
      try {
        await checkOnboarded({});
      } catch (error) {
        // Silences the error since error handling
        // is already taken care of by the guard hook
      }
    };

    callCheckOnboarded();
  }, [checkOnboarded]);
};

export default useOnboarded;
