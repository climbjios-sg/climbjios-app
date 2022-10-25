import {
  Stack,
  Tabs,
  Tab,
  SxProps,
  Theme,
  useTheme,
  AppBar,
  IconButton,
  Toolbar,
} from '@mui/material';
import { User } from 'src/@types/user';
import { capitalCase } from 'change-case';
import ProfileHeader from './ProfileHeader';
import useTabs from '../../hooks/ui/useTabs';
import Iconify from '../Iconify';
import { useNavigate } from 'react-router';
import BackBar from '../BackBar';

interface ProfileProps {
  sx?: SxProps<Theme>;
  showBack?: boolean;
  user: User;
  aboutTab: React.ReactElement;
  betasTab: React.ReactElement;
}

export default function ProfileHeaderAndTabs({
  sx,
  user,
  aboutTab,
  betasTab,
  showBack,
}: ProfileProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentTab, onChangeTab } = useTabs('about');

  const PROFILE_TABS = [
    {
      value: 'about',
      component: aboutTab,
    },
    {
      value: 'betas',
      component: betasTab,
    },
  ];

  return (
    <Stack spacing={2} direction="column" sx={sx}>
      <Stack
        spacing={2}
        direction="column"
        sx={{
          position: 'fixed',
          zIndex: theme.zIndex.appBar,
          left: 0,
          top: 0,
          background: 'white',
          width: '100%',
        }}
      >
        {showBack && <BackBar position="static" hideBarFromViewOnScroll />}
        <Stack sx={{ px: 2, pt: showBack ? 2 : 4 }} direction="column" spacing={1}>
          <ProfileHeader user={user} />
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} value={tab.value} label={capitalCase(tab.value)} />
            ))}
          </Tabs>
        </Stack>
      </Stack>
      <Stack sx={{ height: showBack ? '190px' : '140px' }} />
      <Stack>
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && tab.component;
        })}
      </Stack>
    </Stack>
  );
}
