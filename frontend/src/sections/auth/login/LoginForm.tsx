// @mui
import { Stack, Button, Typography } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  return (
    <>
      <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={1.5}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          href={`https://www.linkedin.com/oauth/v2/authorization?client_id=86d4ufzdgzrw2b&redirect_uri=${window.location.origin}&response_type=code&scope=r_emailaddress%2Cr_liteprofile`}
        >
          <Iconify icon={'cib:linkedin'} color="#0e76a8" width={24} height={24} sx={{ mx: 1 }} />
          <Typography variant="button">Continue with LinkedIn</Typography>
        </Button>
      </Stack>
    </>
  );
}
