import { useEffect } from 'react';
import useCheckNotOnboarded from './useCheckNotOnboarded';

const useNotOnboarded = () => {
  const checkNotOnboarded = useCheckNotOnboarded();

  useEffect(() => {
    const callCheckNotOnboarded = async () => {
      try {
        await checkNotOnboarded();
      } catch (error) {
        // Silences the error since error handling
        // is already taken care of by the guard hook
      }
    };

    callCheckNotOnboarded();
  }, [checkNotOnboarded]);
};

export default useNotOnboarded;
