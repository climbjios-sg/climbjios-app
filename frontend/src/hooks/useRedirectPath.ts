import { useCallback } from 'react';
import { NavigateOptions } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

export type RedirectPathState = {
  to: string;
  options?: NavigateOptions;
} | null;

export default function useRedirectPath() {
  const { value: redirectPath, setValueInLocalStorage: setRedirectPath } =
    useLocalStorage<RedirectPathState>('redirectPathData', null);

  const clearRedirectPath = useCallback(() => {
    setRedirectPath(null);
  }, [setRedirectPath]);

  return {
    redirectPath,
    setRedirectPath,
    clearRedirectPath,
  };
}
