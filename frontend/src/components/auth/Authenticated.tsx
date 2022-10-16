import { ReactNode } from 'react';
import useAuthenticated from 'src/hooks/auth/useAuthenticated';

interface Props {
  children?: ReactNode;
}

// TODO: useCheckOnboarded
export default function Authenticated({ children }: Props) {
  useAuthenticated();

  return <>{children}</>;
}
