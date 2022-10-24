import { ReactNode } from 'react';
import useNotAuthenticated from 'src/hooks/guards/useNotAuthenticated';

interface Props {
  children?: ReactNode;
}

export default function NotAuthenticated({ children }: Props) {
  useNotAuthenticated();

  return <>{children}</>;
}
