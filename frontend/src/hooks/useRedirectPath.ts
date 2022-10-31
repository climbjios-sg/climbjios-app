import { NavigateOptions } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

export type RedirectPathState = {
  to: string;
  options?: NavigateOptions;
} | null;

export default function useRedirectPath() {
  const { value: redirectPath, setValueInLocalStorage: setRedirectPath } = useLocalStorage<RedirectPathState>(
    'redirectPathData',
    null
  );

  const clearRedirectPath = () => {
    setRedirectPath(null);
  };

  return {
    redirectPath,
    setRedirectPath,
    clearRedirectPath,
  };
}
