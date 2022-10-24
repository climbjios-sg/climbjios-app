import { capitalCase } from 'change-case';
// @mui
import {
  Box,
  Stack,
  Grid,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import Iconify from '../../components/Iconify';
// hooks
import useTabs from 'src/hooks/ui/useTabs';
import { useNavigate, useLocation } from 'react-router';
// components
import FloatingBottomCard from 'src/components/FloatingBottomCard';
import BioCard from '../dashboard/profile/BioCard';
import Sends from '../dashboard/profile/Sends';
// types
import { User } from 'src/@types/user';

interface UserProfileProps {
  data: User;
}

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  const { currentTab, onChangeTab } = useTabs('about');
  const PROFILE_TABS = [
    {
      value: 'about',
      component: !data ? <></> : <BioCard data={data} />,
    },
    // Uncomment when sends feature is ready
    // {
    //   value: 'sends',
    //   // component: <Sends sends={data.data, data.sends} />,
    // },
  ];

  const handleClickBackButton = () => navigate(-1);

  return data ? (
    <Box sx={{
      pt: 5,
      pb: 25,
      px: '15px',
      margin: '0 auto',
    }}>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Stack spacing={2} textAlign="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 4 }}>
            <Avatar
              alt={'Profile picture'}
              src={data.profilePictureUrl}
              sx={{
                width: 96,
                height: 96,
                zIndex: 11,
                mx: 'auto',
              }}
            />

            <Stack spacing={1} textAlign="center" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="subtitle1">
                {data.name || 'Something went wrong! Couldn\'t retrieve user\'s name :('}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {`@${data.telegramHandle}` || 'Something went wrong! Couldn\'t retrieve user\'s Telegram handle :('}
              </Typography>
            </Stack>

            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
            {PROFILE_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}

          </Stack>
        </Grid>
      </Grid>
      <FloatingBottomCard>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<Iconify icon={'jam:telegram'} />}
          fullWidth
          disableElevation
          // href='https://t.me/'
        >
          <Typography variant="button">{"Message on Telegram"}</Typography>
        </Button>
        <Button
          size="large"
          variant="outlined"
          fullWidth
          onClick={handleClickBackButton}
          sx={{ mt: 2 }}
        >
          Back
        </Button>
      </FloatingBottomCard>
    </Box>
  ): <></>;
}
