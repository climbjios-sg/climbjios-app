import { ReactNode } from 'react';
import useAutoLogin from 'src/hooks/auth/useAutoLogin';

type Props = {
  children?: ReactNode;
};

export default function Public({ children }: Props) {
  useAutoLogin();

  return children;
}
