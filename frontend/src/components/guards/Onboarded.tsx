import { ReactNode } from 'react';
import useOnboarded from 'src/hooks/guards/useOnboarded';

interface Props {
  children?: ReactNode;
}

// TODO: useOnboarded
export default function Onboarded({ children }: Props) {
  useOnboarded();

  return <>{children}</>;
}
