import { ReactNode } from 'react';
import useCheckAuth from 'src/hooks/guards/useCheckAuth';
import useCheckNotAuth from 'src/hooks/guards/useCheckNotAuth';
import useCheckNotOnboarded from 'src/hooks/guards/useCheckNotOnboarded';
import useCheckOnboarded from 'src/hooks/guards/useCheckOnboarded';
import useGuard from 'src/hooks/guards/useGuard';

interface Props {
  children?: ReactNode;
  authenticated?: boolean;
  notAuthenticated?: boolean;
  onboarded?: boolean;
  notOnboarded?: boolean;
}

// Incurs slightly more overhead compared to <Guard/> since
// it preloads some common guards
/**
 * Applies guards enabled in this order:
 * 1. Checks authenticated
 * 2. Checks authenticated
 * 3. Checks onboarded
 * 4. Checks not onboarded
 */
export default function CommonGuard({
  children,
  authenticated = false,
  notAuthenticated = false,
  onboarded = false,
  notOnboarded = false,
}: Props) {
  const checkAuth = useCheckAuth();
  const checkNotAuth = useCheckNotAuth();
  const checkOnboarded = useCheckOnboarded();
  const checkNotOnboarded = useCheckNotOnboarded();

  const guards = [];
  authenticated && guards.push(checkAuth);
  notAuthenticated && guards.push(checkNotAuth);
  onboarded && guards.push(checkOnboarded);
  notOnboarded && guards.push(() => checkNotOnboarded(true, true));

  useGuard(guards);

  return <>{children}</>;
}
