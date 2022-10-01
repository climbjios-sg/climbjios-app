import { useState, useEffect } from 'react';
// @mui
import { Grid, Stack, Button, Box, IconButton, Typography } from '@mui/material';
// @types
import { User } from '../../@types/user';
import ProfileAbout from '../../sections/@dashboard/user/profile/ProfileAbout';
import ProfileQR from '../../sections/@dashboard/user/profile/ProfileQR';
import ProfileSocialInfo from '../../sections/@dashboard/user/profile/ProfileSocialInfo';
import Iconify from '../../components/Iconify';
import NewUserForm from '../../sections/@dashboard/user/NewUserForm';
import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

type Props = {
  profile: User;
};

export default function MyQR({ profile }: Props) {
  const auth = useAuth();
  const [isShowForm, setIsShowForm] = useState(false);

  if (isShowForm) {
    return (
      <EditProfileForm
        profile={profile}
        onExit={() => {
          setIsShowForm(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <Grid container spacing={3} sx={{ pb: 40, pt: 3, justifyContent: 'center' }}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfileQR profile={profile} />
          <ProfileAbout
            profile={profile}
            action={
              <Button
                size="small"
                variant="outlined"
                sx={{ flexShrink: 0 }}
                onClick={() => {
                  setIsShowForm(true);
                }}
              >
                Edit
              </Button>
            }
          />
          <ProfileSocialInfo profile={profile} />
          <Button
            variant="outlined"
            onClick={() => {
              auth.logout();
            }}
          >
            Logout
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

type EditProfileFormProps = {
  profile: User;
  onExit: () => void;
};

function EditProfileForm({ onExit, profile }: EditProfileFormProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ pt: 5, pb: 20 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Edit Profile</Typography>
        <IconButton onClick={onExit} sx={{ mb: 1 }}>
          <Iconify icon={'eva:close-outline'} width={24} height={24} />
        </IconButton>
      </Stack>
      <NewUserForm isEdit currentUser={profile} onExit={onExit} />
    </Box>
  );
}
