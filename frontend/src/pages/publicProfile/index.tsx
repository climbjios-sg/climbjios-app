import { capitalCase } from 'change-case';
// @mui
import {
  Box,
  Stack,
  Grid,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Button,
  AppBar,
  IconButton,
  Toolbar,
} from '@mui/material';
import Iconify from '../../components/Iconify';
// hooks
import useTabs from 'src/hooks/ui/useTabs';
import { useNavigate, useLocation } from 'react-router';
// components
import FloatingBottomCard from 'src/components/FloatingBottomCard';
import BioCard from '../../components/BioCard';
// types
import { User } from 'src/@types/user';
import { PATH_USER } from '../../routes/paths';

export type UserProfileLocationState = {
  user: User;
  isShowFloatingButton?: boolean;
};

export function makeUserProfileLinkProps(userProfileData: UserProfileLocationState) {
  return {
    to: PATH_USER.general.user(userProfileData.user.userId),
    state: userProfileData,
  };
}

export default function PublicProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isShowFloatingButton = false } = location.state as UserProfileLocationState;
  const { currentTab, onChangeTab } = useTabs('about');
  const PROFILE_TABS = [
    {
      value: 'about',
      component: user ? <BioCard data={user} /> : null,
    },
    {
      value: 'betas',
      component: <></>,
    },
  ];

  return user ? (
    <Box
      sx={{
        pb: 25,
        width: '100vw',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <AppBar
        sx={{
          background: 'white',
          color: 'text.primary',
        }}
        position="static"
      >
        <Toolbar sx={{ pl: 1 }}>
          <IconButton
            sx={{ mr: 1 }}
            color="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Iconify icon="eva:arrow-back-fill" color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack spacing={2} direction="column" sx={{ pt: 4, px: 2 }}>
        <Stack direction="row" alignItems="center">
          <Avatar
            alt={user.telegramHandle}
            src={user.profilePictureUrl}
            sx={{
              width: 60,
              height: 60,
              zIndex: 11,
              mr: 2,
              ml: 1,
            }}
          />
          <Stack direction="column">
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1">{user.name}</Typography>
              {user.pronoun && <Typography variant="body2">{user.pronoun.name}</Typography>}
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`@${user.telegramHandle}`}
            </Typography>
          </Stack>
        </Stack>

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
        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && tab.component;
        })}
      </Stack>
      {isShowFloatingButton && (
        <FloatingBottomCard>
          <Button
            sx={{ marginBottom: 3 }}
            size="large"
            variant="contained"
            color="secondary"
            startIcon={<Iconify icon={'jam:telegram'} />}
            fullWidth
            disableElevation
            href={`https://t.me/${user.telegramHandle}`}
          >
            <Typography variant="button">{'Message on Telegram'}</Typography>
          </Button>
        </FloatingBottomCard>
      )}
    </Box>
  ) : (
    <></>
  );
}
