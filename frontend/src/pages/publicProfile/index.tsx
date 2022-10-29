// @mui
import { Box, Typography, Button } from '@mui/material';
import Iconify from '../../components/Iconify';
// hooks
import { useLocation } from 'react-router';
// components
import FloatingBottomCard from 'src/components/FloatingBottomCard';
import BioCard from '../../components/profile/BioCard';
// types
import { User } from 'src/@types/user';
import { PATH_USER } from '../../routes/paths';
import ProfileBetas from '../../components/profile/ProfileBetas';
import ProfileHeaderAndTabs from '../../components/profile/ProfileHeaderAndTabs';
import { outgoingLinkProps } from '../../utils/common';
import { Stack } from '@mui/system';

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
      <ProfileHeaderAndTabs
        showBack
        user={user}
        aboutTab={
          <Stack sx={{ px: 2 }}>
            <BioCard data={user} />
          </Stack>
        }
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
            {...outgoingLinkProps}
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
