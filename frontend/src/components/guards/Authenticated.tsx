import { ReactNode } from 'react';
import useAuthenticated from 'src/hooks/guards/useAuthenticated';

interface Props {
  children?: ReactNode;
}

export default function Authenticated({ children }: Props) {
  useAuthenticated();

  return <>{children}</>;
}
