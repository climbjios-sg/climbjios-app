// @mui
import { Stack, Button, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
//
import { BE_API } from 'src/utils/api';
// @ts-ignore (react-telegram-login is missing a @types file)
import TelegramLoginButton from 'react-telegram-login';

// ----------------------------------------------------------------------

export default function LoginForm() {
  return (
    <>
      <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={1.5}>
        <Button
          fullWidth
          size="large"
          color="error"
          variant="outlined"
          startIcon={
            <Iconify icon={'ant-design:google-outlined'} width={24} height={24} sx={{ mx: 1 }} />
          }
          href={`${process.env.REACT_APP_HOST_API_KEY}${BE_API.auth.google}`}
        >
          <Typography variant="button">Continue with Google</Typography>
        </Button>
        <TelegramLoginButton
          dataAuthUrl={`${process.env.REACT_APP_HOST_API_KEY}${BE_API.auth.telegramRedirect}`}
          botName={`${process.env.REACT_APP_TELEGRAM_OAUTH_BOT_USERNAME}`}
        />
      </Stack>
    </>
  );
}
