// @mui
import { Box, Typography, Button } from '@mui/material';
import Iconify from '../../components/Iconify';
// hooks
import { useLoaderData, useLocation } from 'react-router';
// components
import FloatingBottomCard from 'src/components/FloatingBottomCard';
import BioCard from '../../components/profile/BioCard';
// types
import ProfileBetas from '../../components/profile/ProfileBetas';
import ProfileHeaderAndTabs from '../../components/profile/ProfileHeaderAndTabs';
import { outgoingLinkProps } from '../../utils/common';
import { Stack } from '@mui/system';
import Page404 from '../error/Page404';

export default function GymDetailsPage() {
  const location = useLocation();
  console.log(location);
  const gymId = parseInt(location.pathname.replace('/gyms/', ''));

  useLoaderData();

  const state = location.state;
  if (!state || !state.user) {
    return <Page404 />;
  }

  const { user, backTo } = state;
  return (
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
        backTo={backTo}
        user={user}
        aboutTab={
          <Stack sx={{ px: 2 }}>
            <BioCard data={user} />
          </Stack>
        }
        betasTab={<ProfileBetas creatorId={user.userId} />}
      />
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
    </Box>
  );
}
