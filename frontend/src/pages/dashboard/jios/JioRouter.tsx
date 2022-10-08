import { useRoutes } from 'react-router';
import Jios from '.';

export default function JioRouter() {
  return useRoutes([
    {
      path: 'search',
      element: <></>,
    },
    {
      path: '',
      element: <Jios />,
    },
  ]);
}
