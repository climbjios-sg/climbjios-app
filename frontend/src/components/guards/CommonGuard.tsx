import { ReactNode, useCallback, useMemo } from 'react';
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
 * 2. Checks not authenticated
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
  const _checkOnboarded = useCheckOnboarded();
  const _checkNotOnboarded = useCheckNotOnboarded();

  const checkOnboarded = useCallback(
    () => _checkOnboarded({ disableNotification: true }),
    [_checkOnboarded]
  );
  const checkNotOnboarded = useCallback(
    () => _checkNotOnboarded({ disableNotification: true }),
    [_checkNotOnboarded]
  );

  const guards = useMemo(() => {
    const res = [];
    authenticated && res.push(checkAuth);
    notAuthenticated && res.push(checkNotAuth);
    onboarded && res.push(checkOnboarded);
    notOnboarded && res.push(checkNotOnboarded);

    return res;
  }, [
    authenticated,
    notAuthenticated,
    notOnboarded,
    onboarded,
    checkAuth,
    checkNotAuth,
    checkNotOnboarded,
    checkOnboarded,
  ]);

  const { loading, error, ward } = useGuard(guards, children);

  const isSafeToRender = ward === children && !loading && error === undefined;
  if (!isSafeToRender) {
    // TODO: skeleton
    return null;
  }

  return <>{ward}</>;
}
