import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import EditJios from './edit/EditJios';
import SearchJios from './search/SearchJios';
import CreateJios from './create/CreateJios';
import JiosTabs from './list/JiosTabs';

export default function Jios() {
  return useRoutes([
    {
      path: 'edit',
      element: <EditJios />
    },
    {
      path: 'search',
      element: <SearchJios />
    },
    {
      path: 'create',
      element: <CreateJios />
    },
    {
      path: '',
      element: <JiosTabs />
    }
  ])
}
