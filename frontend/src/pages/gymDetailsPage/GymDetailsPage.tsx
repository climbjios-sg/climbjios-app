// @mui
import { Tabs, Tab } from '@mui/material';
import { Stack } from '@mui/system';
import { Params, useLoaderData } from 'react-router';
import Page404 from '../error/Page404';
import { getGymDetails } from 'src/services/gyms';
import { GymData } from 'src/@types/gymData';
import { AxiosResponse } from 'axios';
import GymPageHeader from './GymPageHeader';
import { capitalCase } from 'change-case';
import { useState } from 'react';

export function gymDetailsLoader({
  params,
}: {
  params: Params;
}): Promise<AxiosResponse<GymData, any>> | undefined {
  const gymId = parseInt(params.gymId ?? '');
  if (!gymId) {
    return undefined;
  }
  return getGymDetails(gymId);
}

export default function GymDetailsPage() {
  const gymDetails = (useLoaderData() as AxiosResponse<GymData, any>).data;
  const [currentTab, changeTab] = useState(0);

  if (!gymDetails) {
    return <Page404 />;
  }

  const tabs = [{ label: 'about' }, { label: 'betas' }];

  return (
    <Stack spacing={2} direction="column">
      {GymPageHeader(gymDetails)}

      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={(_e, v) => {
          changeTab(v);
        }}
      >
        {tabs.map((tab, index) => (
          <Tab disableRipple key={index} value={index} label={capitalCase(tab.label)} />
        ))}
      </Tabs>
      {tabs[currentTab].label}
    </Stack>
  );
}
