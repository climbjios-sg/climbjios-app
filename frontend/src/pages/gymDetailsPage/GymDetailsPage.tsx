// @mui
import { Tabs, Tab, Box } from '@mui/material';
import { Stack } from '@mui/system';
import { Params, useLoaderData } from 'react-router';
import Page404 from '../error/Page404';
import { getGymDetails } from 'src/services/gyms';
import { GymDetails } from 'src/@types/gymDetails';
import { AxiosResponse } from 'axios';
import GymPageHeader from './GymPageHeader';
import { capitalCase } from 'change-case';
import GymBetas from './GymBetasTab';
import GymAboutTab from './GymAboutTab';
import GymPassesTab from './GymPassesTab';
import useTabs from 'src/hooks/ui/useTabs';

export function gymDetailsLoader({
  params,
}: {
  params: Params;
}): Promise<AxiosResponse<GymDetails, any>> | undefined {
  const gymId = parseInt(params.gymId ?? '');
  if (!gymId) {
    return undefined;
  }
  return getGymDetails(gymId);
}

export default function GymDetailsPage() {
  const gymDetails = (useLoaderData() as AxiosResponse<GymDetails, any>).data;
  const { currentTab, onChangeTab } = useTabs(0);

  if (!gymDetails) {
    return <Page404 />;
  }

  const tabs = [
    {
      label: 'about',
      component: <GymAboutTab gymDetails={gymDetails} />,
    },
    { label: 'betas', component: <GymBetas gymId={gymDetails.id} /> },
    { label: 'passes', component: <GymPassesTab gymId={gymDetails.id} /> },
  ];

  return (
    <Stack direction="column">
      {GymPageHeader(gymDetails)}
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
      {tabs[currentTab].component}
    </Stack>
  );
}
