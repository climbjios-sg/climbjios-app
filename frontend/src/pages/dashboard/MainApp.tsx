import * as React from 'react';
// @mui
import { Container, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
// components
import Page from '../../components/Page';
import { useLocation, Link, Routes, Route, useRoutes } from 'react-router-dom';
import Iconify from '../../components/Iconify';
// import Jios from './jios';
// import JiosForm from './jios/JiosForm';
import JiosRouter from './jios/JiosRouter';
import useAuth from '../../hooks/useAuth';
import Profile from './profile';

interface BottomTab {
  path: string;
  to: string;
  label: string;
  icon: React.ReactElement;
}

interface BottomTabsProps {
  tabs: BottomTab[];
}

function BottomTabs({ tabs }: BottomTabsProps) {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const matchPath = paths[2];

  return (
    <BottomNavigation showLabels value={matchPath}>
      {tabs.map((tab) => (
        <BottomNavigationAction
          key={tab.path}
          to={tab.to}
          label={tab.label}
          icon={tab.icon}
          value={tab.to}
          component={Link}
        />
      ))}
    </BottomNavigation>
  );
}

export default function MainApp() {
  const auth = useAuth();
  const DASHBOARD_TABS = React.useMemo(
    () => [
      {
        path: 'jios/*',
        to: 'jios',
        label: 'Jios',
        icon: <Iconify icon={'eva:people-outline'} width={20} height={20} />,
        element: <JiosRouter />,
      },
      {
        path: 'profile',
        to: 'profile',
        label: 'Profile',
        icon: <Iconify icon={'eva:person-outline'} width={20} height={20} />,
        element: (
          <Profile />
        ),
        children: [],
      },
    ],
    [auth]
  );

  const MainAppRouter = () => useRoutes(DASHBOARD_TABS.map((tab) => ({ path: tab.path, element: tab.element, children: tab.children })));

  return (
    <Page title="ClimbJios - The social network for climbers." sx={{ background: '#fafafa' }}>
      <Container>
        <MainAppRouter />
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
        <BottomTabs tabs={DASHBOARD_TABS} />
      </Paper>
    </Page>
  );
}
