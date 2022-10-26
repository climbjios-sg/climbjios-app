import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Container, Stack, Tab, Tabs, Box, Divider } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderStyle from 'src/components/HeaderStyle';
import TabsWrapperStyle from 'src/components/TabsWrapperStyle';
// assets
import { PATH_AUTH } from 'src/routes/paths';
import Logo from 'src/components/Logo';
import Separator from 'src/components/Separator';
//sections
import TelegramUsernameAndroid from './TelegramUsernameAndroid';
import TelegramUsernameIOS from './TelegramUsernameIOS';
// hooks
import useTabs from 'src/hooks/ui/useTabs';
import FloatingBottomCard from 'src/components/FloatingBottomCard';

// ----------------------------------------------------------------------

export default function NoTelegramUsernamePage() {
  const PLATFORM_TABS = [
    {
      value: 'Android',
      icon: <Iconify icon={'ic:round-android'} width={20} height={20} />,
      component: <TelegramUsernameAndroid />,
    },
    {
      value: 'iOS',
      icon: <Iconify icon={'ant-design:apple-filled'} width={20} height={20} />,
      component: <TelegramUsernameIOS />,
    },
  ];

  const { currentTab, onChangeTab } = useTabs('Android');

  return (
    <Page title="Configure Telegram username">
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Container maxWidth="md" sx={{ px: 3, mt: 10, pb: 15 }}>
        <Stack spacing={3} justifyContent="center">
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" paragraph>
              Uh oh!
              <br />
              Your Telegram account doesn't have a username yet
            </Typography>

            <Typography variant="h5">
              Other climbers will not be able to contact you via Telegram until you set a username.
            </Typography>
          </Box>
          <Typography>
            Setting a username in Telegram allows people who don't know your mobile number to
            contact you. If you'd like other climbers to reach you via Telegram, you should set a
            username.
            <br />
            <br />
            For more information on usernames, visit the{' '}
            <a href="https://telegram.org/faq#q-who-can-contact-me">Telegram FAQ page</a>
          </Typography>

          <Divider />

          <Stack spacing={1.5}>
            <Typography variant="h4">How do I set a Telegram username?</Typography>
            <TabsWrapperStyle>
              <Tabs
                allowScrollButtonsMobile
                variant="scrollable"
                scrollButtons="auto"
                value={currentTab}
                onChange={onChangeTab}
              >
                {PLATFORM_TABS.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    value={tab.value}
                    icon={tab.icon}
                    label={tab.value}
                  />
                ))}
              </Tabs>
            </TabsWrapperStyle>
            {PLATFORM_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
            <Typography>
              You have successfully set a Telegram username. This username will be displayed on your
              profile, and other climbers can reach you via this Telegram username.
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <FloatingBottomCard>
        <Box width="100%" maxWidth="sm">
          <Button
            to={PATH_AUTH.root}
            size="large"
            variant="contained"
            fullWidth
            component={RouterLink}
          >
            Go Back
          </Button>
        </Box>
      </FloatingBottomCard>
    </Page>
  );
}
