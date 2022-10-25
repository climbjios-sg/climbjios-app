import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import ProfileHeaderAndTabs from 'src/components/profile/ProfileHeaderAndTabs';
import useGetIdentity from 'src/hooks/auth/useGetIdentity';
import BioCard from '../../../../components/profile/BioCard';
import Iconify from '../../../../components/Iconify';
import ProfileBetas from '../../../../components/profile/ProfileBetas';
import useLogout from '../../../../hooks/auth/useLogout';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function MyProfile() {
  const { identity: user } = useGetIdentity();
  const logout = useLogout();

  if (!user) {
    return <></>;
  }

  return (
    <ProfileHeaderAndTabs
      sx={{ px: 0, maxWidth: 600, margin: '0 auto', pb: 20 }}
      user={user}
      aboutTab={
        <Stack direction="column" alignItems="center" spacing={3}>
          <BioCard
            data={user}
            action={
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to={PATH_DASHBOARD.general.profile.edit}
              >
                Edit
              </Button>
            }
          />
          <Button
            startIcon={<Iconify icon="material-symbols:logout-rounded" />}
            variant={'outlined'}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        </Stack>
      }
      betasTab={<ProfileBetas isMine creatorId={user.userId} />}
    />
  );
}
