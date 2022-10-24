import { capitalCase } from 'change-case';
// @mui
import {
  Box,
  Stack,
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
import BioCard from '../../components/profile/BioCard';
// types
import { User } from 'src/@types/user';
import { PATH_USER } from '../../routes/paths';
import ProfileBetas from '../../components/profile/ProfileBetas';
import ProfileHeaderAndTabs from '../../components/profile/ProfileHeaderAndTabs';

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
      <ProfileHeaderAndTabs
        user={user}
        aboutTab={<BioCard data={user} />}
        betasTab={<ProfileBetas creatorId={user.userId} />}
      />
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
            <Typography variant="button">Message on Telegram</Typography>
          </Button>
        </FloatingBottomCard>
      )}
    </Box>
  ) : (
    <></>
  );
}
