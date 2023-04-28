// @mui
import { Toolbar, IconButton, Typography, Avatar } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from '../../components/Iconify';
import { GymDetails } from 'src/@types/gymDetails';
import { useNavigate } from 'react-router';

export default function GymPageHeader(gymDetails: GymDetails) {
  const navigate = useNavigate();
  const logoSize = 70;

  return (
    <div
      style={{
        //shamelessly copy pasted from the CSS in figma (and stackoverflow)
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${gymDetails.bannerUrl}")`,
        // backgroundSize: '100% auto',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%, 50%'
      }}
    >
      <Toolbar sx={{ ml: -2, background: 'transparent' }}>
        <IconButton
          sx={{ mr: 1 }}
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Iconify sx={{ width: 40, height: 40 }} icon="ic:round-chevron-left" color="white" />
        </IconButton>
      </Toolbar>
      <Stack
        height={200}
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
