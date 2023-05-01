// @mui
import { IconButton, Typography, Avatar, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from '../../components/Iconify';
import { GymDetails } from 'src/@types/gymDetails';
import { NavigateFunction } from 'react-router';
import FloatingContainer from 'src/components/FloatingContainer';

export default function GymPageHeader({
  gymDetails,
  navigate,
}: {
  gymDetails: GymDetails;
  navigate: NavigateFunction;
}) {
  const logoSize = 70;
  const theme = useTheme();

  return (
    <div
      style={{
        //shamelessly copy pasted from the CSS in figma (and stackoverflow)
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${gymDetails.bannerUrl}")`,
        // backgroundSize: '100% auto',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%, 50%',
      }}
    >
      {/* <Toolbar sx={{ mt: '56px', ml: -2, background: 'transparent' }}>
        <IconButton
          sx={{ mr: 1 }}
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Iconify sx={{ width: 40, height: 40 }} icon="ic:round-chevron-left" color="white" />
        </IconButton>
      </Toolbar> */}
      <FloatingContainer>
        <IconButton
          sx={{ mr: 1 }}
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Avatar sx={{ backgroundColor: theme.palette.primary.light }}>
            <Iconify sx={{ width: 40, height: 40 }} icon="ic:round-chevron-left" color="white" />
          </Avatar>
        </IconButton>
      </FloatingContainer>
      <Stack
        height={225}
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={1}
        sx={{ color: 'white' }}
      >
        <Avatar
          src={gymDetails.iconUrl}
          alt={gymDetails.name}
          sx={{ ml: 2, width: logoSize, height: logoSize, backgroundColor: 'white' }}
        />

        <Stack sx={{ pl: 2, pb: 2 }}>
          <Typography variant="h2">{gymDetails.name}</Typography>
        </Stack>
      </Stack>
    </div>
  );
}
