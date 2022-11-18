// @mui
import { Stack, Box } from '@mui/material';
import { BE_API } from 'src/utils/api';
// @ts-ignore (react-telegram-login is missing a @types file)
import TelegramLoginButton from 'react-telegram-login';

// ----------------------------------------------------------------------

export default function LoginForm() {
  return (
    <>
      <Stack
        sx={{ maxWidth: 600 }}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box sx={{ width: '100%', mb: 2 }}>
          {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
            Recommended for smoother onboarding
          </Typography> */}
          <TelegramLoginButton
            dataAuthUrl={`${import.meta.env.VITE_HOST_API_KEY}${BE_API.auth.telegramRedirect}`}
            botName={`${import.meta.env.VITE_TELEGRAM_OAUTH_BOT_USERNAME}`}
          />
        </Box>
        {/* NOTE: Disable other login options for now */}
        {/* <Box sx={{ width: '100%' }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
            Other Option
          </Typography>
          <Button
            fullWidth
            size="large"
            color="error"
            variant="outlined"
            startIcon={
              <Iconify icon={'ant-design:google-outlined'} width={24} height={24} sx={{ mx: 1 }} />
            }
            href={`${import.meta.env.VITE_HOST_API_KEY}${BE_API.auth.google}`}
          >
            <Typography variant="button">Continue with Google</Typography>
          </Button>
        </Box> */}
      </Stack>
    </>
  );
}
