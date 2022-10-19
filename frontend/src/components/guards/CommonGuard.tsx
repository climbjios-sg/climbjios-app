import { ReactNode } from 'react';
import useCheckAuth from 'src/hooks/guards/useCheckAuth';
import useCheckNotOnboarded from 'src/hooks/guards/useCheckNotOnboarded';
import useCheckOnboarded from 'src/hooks/guards/useCheckOnboarded';
import useGuard from 'src/hooks/guards/useGuard';

interface Props {
  children?: ReactNode;
  authenticated?: boolean;
  onboarded?: boolean;
  notOnboarded?: boolean;
}

// Incurs slightly more overhead compared to <Guard/> since
// it preloads some common guards
/**
 * Applies guards enabled in this order:
 * 1. Checks authenticated
 * 2. Checks onboarded
 * 3. Checks not onboarded
 */
export default function CommonGuard({
  children,
  authenticated = false,
  onboarded = false,
  notOnboarded = false,
}: Props) {
  const checkAuth = useCheckAuth();
  const checkOnboarded = useCheckOnboarded();
  const checkNotOnboarded = useCheckNotOnboarded();

  const guards = [];
  authenticated && guards.push(checkAuth);
  onboarded && guards.push(checkOnboarded);
  notOnboarded && guards.push(checkNotOnboarded);

  useGuard(guards);

  return <>{children}</>;
}
