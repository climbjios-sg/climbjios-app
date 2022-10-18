import { ReactNode } from 'react';
import useNotOnboarded from 'src/hooks/auth/useNotOnboarded';

interface Props {
  children?: ReactNode;
}

export default function NotOnboarded({ children }: Props) {
  useNotOnboarded();

  return <>{children}</>;
}
