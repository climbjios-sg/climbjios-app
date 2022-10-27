import { ReactNode } from 'react';
import useGuard from 'src/hooks/guards/useGuard';

interface Props {
  children?: ReactNode;
  guards?: Function[];
}

export default function Guard({ children, guards = [] }: Props) {
  const { loading, error, ward } = useGuard(guards, children);

  if (loading || error) {
    return null;
  }

  return <>{ward}</>;
}
