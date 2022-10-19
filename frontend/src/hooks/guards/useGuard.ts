import { useEffect } from 'react';

/**
 * TODO: create a common interface for guards but
 * will require some changes in the implementation
 * of current guards
 * (onError, disableNotification) => Promise<void>
 */
const useGuard = (guards: Function[]) => {
  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        for (const guard of guards) {
          guard();
        }
      } catch (error) {
        // Silences the error since error handling
        // is already taken care of by the guard hook
      }
    };

    callCheckAuth();
  }, [guards]);
};

export default useGuard;
