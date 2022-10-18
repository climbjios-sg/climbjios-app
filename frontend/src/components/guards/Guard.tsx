import { ReactNode } from 'react';
import useGuard from 'src/hooks/guards/useGuard';

interface Props {
  children?: ReactNode;
  guards?: Function[];
}

export default function Guard({ children, guards = [] }: Props) {
  useGuard(guards);

  return <>{children}</>;
}
