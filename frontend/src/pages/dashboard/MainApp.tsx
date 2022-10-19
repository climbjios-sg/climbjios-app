import { useEffect } from 'react';
// @mui
import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
} from '@mui/material';
// components
import Page from '../../components/Page';
import { useLocation, Link, useRoutes, Navigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Profile from './profile';
import Jios from './jios';
import { listGyms } from '../../store/reducers/gyms';
import { useDispatch } from '../../store';
import Beta from './beta';
import { listColors } from '../../store/reducers/colors';
import { listWalls } from '../../store/reducers/walls';
import MessageBarWithStore from './MessageBarWithStore';

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
  // matchPath is the current subpath, e.g. for /dashboard/jios/search -> matchPath is jios
  const matchPath = paths.length >= 3 ? paths[2] : '';

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
const DASHBOARD_TABS = [
  {
    path: 'jios/*',
    to: 'jios',
    label: 'Jios',
    icon: <Iconify icon={'eva:people-outline'} width={20} height={20} />,
    element: <Jios />,
  },
  {
    path: 'beta/*',
    to: 'beta',
    label: 'Beta',
    icon: <Iconify icon={'akar-icons:video'} width={20} height={20} />,
    element: <Beta />,
  },
  {
    path: 'profile/*',
    to: 'profile',
    label: 'Profile',
    icon: <Iconify icon={'eva:person-outline'} width={20} height={20} />,
    element: <Profile />,
  },
];

const MainAppRouter = () =>
  useRoutes([
    ...DASHBOARD_TABS.map((tab) => ({
      path: tab.path,
      element: tab.element,
    })),
    { path: '*', element: <Navigate to="jios" replace /> },
  ]);

export default function MainApp() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGyms());
    dispatch(listColors());
    dispatch(listWalls());
  }, [dispatch]);

  return (
    <Page title="ClimbJios - The social network for climbers.">
      <MessageBarWithStore />
      <Container>
        <MainAppRouter />
      </Container>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: theme.zIndex.appBar }}
        elevation={3}
      >
        <BottomTabs tabs={DASHBOARD_TABS} />
      </Paper>
    </Page>
  );
}
