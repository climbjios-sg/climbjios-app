import { Navigate, useRoutes } from 'react-router-dom';
import Jios from '.';
import JiosForm from './JiosForm';

export default function JiosRouter() {
  return useRoutes([
    {
      path: '/',
      element: <Jios />,
    },
    {
      path: 'search',
      element: <JiosForm isSearch={true} />,
    },
    {
      path: 'create',
      element: <JiosForm />,
    }
  ]);
}