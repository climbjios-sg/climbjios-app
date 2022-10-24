import { Stack, Tabs, Tab, SxProps, Theme, useTheme } from '@mui/material';
import { User } from 'src/@types/user';
import { capitalCase } from 'change-case';
import ProfileHeader from './ProfileHeader';
import useTabs from '../../hooks/ui/useTabs';

interface ProfileProps {
  sx?: SxProps<Theme>;
  user: User;
  aboutTab: React.ReactElement;
  betasTab: React.ReactElement;
}

export default function ProfileHeaderAndTabs({ sx, user, aboutTab, betasTab }: ProfileProps) {
  const theme = useTheme();
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
        sx={{ position: 'fixed', zIndex: theme.zIndex.appBar, pt: 4, px: 2, background: 'white', width: '100%' }}
      >
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
      <Stack sx={{ mt: '172px !important' }}>
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && tab.component;
        })}
      </Stack>
    </Stack>
  );
}
