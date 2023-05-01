// @mui
import { Tabs, Tab, Box, Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate, useParams } from 'react-router';
import Page404 from '../error/Page404';
import { getGymDetails } from 'src/services/gyms';
import { GymDetails } from 'src/@types/gymDetails';
import { AxiosResponse } from 'axios';
import GymPageHeader from './GymPageHeader';
import { capitalCase } from 'change-case';
import GymBetas from './GymBetasTab';
import GymAboutTab from './GymAboutTab';
import GymPassesTab from './GymPassesTab/GymPassesTab';
import useTabs from 'src/hooks/ui/useTabs';
import { useRequest } from 'ahooks';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import GymPageLoader from 'src/components/gymDetailsPage/GymPageLoader';

export default function GymDetailsPage() {
  const errorSnackbar = useCustomSnackbar();
  const { currentTab, onChangeTab } = useTabs<number>(0);
  const { gymId } = useParams();
  const navigate = useNavigate();

  const { data: response, loading } = useRequest<AxiosResponse<GymDetails, any> | null, any>(
    () => getGymDetails(parseInt(gymId!)),
    {
      onError: () => errorSnackbar.enqueueError('Failed to load data.'),
    }
  );

  if (loading) {
    return (
      <Stack>
        <GymPageLoader />
      </Stack>
    );
  }

  if (!response) {
    return <Page404 />;
  }

  const gymDetails = response.data;

  const tabs = [
    {
      label: 'about',
      component: <GymAboutTab gymDetails={gymDetails} />,
    },
    { label: 'betas', component: <GymBetas gymId={gymDetails.id} /> },
    { label: 'rates', component: <GymPassesTab gymId={gymDetails.id} /> },
  ];

  const disclaimers = [
    "❗️ Disclaimer: the information here is collected manually, and is not guaranteed to be accurate. Do refer to the gyms' websites for full details.",
    '',
    "❗️ Disclaimer: the information here is collected manually, and is not guaranteed to be accurate or exhaustive. Prices shown may also be before GST. Do refer to the gyms' websites for full details.",
  ];

  return (
    <Stack>
      <GymPageHeader gymDetails={gymDetails} navigate={navigate} />
      <Box display="flex" justifyContent="center" width="100%">
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {tabs.map((tab, index) => (
            <Tab disableRipple key={index} value={index} label={capitalCase(tab.label)} />
          ))}
        </Tabs>
      </Box>
      {disclaimers[currentTab] !== '' && (
        <Card sx={{ padding: 1, pl: 2, pr: 2, ml: 2, mr: 2, mt: 1 }}>
          <Typography fontSize={10}>{disclaimers[currentTab]}</Typography>
        </Card>
      )}
      {tabs[currentTab].component}
    </Stack>
  );
}
