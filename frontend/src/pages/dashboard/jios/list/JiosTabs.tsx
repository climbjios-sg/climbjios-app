import * as React from 'react';
import styled from '@emotion/styled';
import { TabContext, TabPanel } from '@mui/lab';
import { Tab, Button, Typography, Grid, Tabs, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from '../../../../components/Iconify';
import useRefresh from '../../../../hooks/useRefresh';
import { setDateTime } from '../../../../utils/formatTime';
import JioCardList from './allJios/JioCardList';
import MyJioCardList from './myJios/MyJioCardList';
import { useSelector } from '../../../../store';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

enum TabValue {
  Open = 'Open',
  MyJios = 'My Jios',
}

export default function JiosTabs() {
  const jioFormValues = useSelector((state) => state.jioSearchForm.data);
  const TABS: TabValue[] = [TabValue.Open, TabValue.MyJios];
  const [tabValue, setTabValue] = React.useState<TabValue>(TabValue.Open);
  const refresh = useRefresh();
  const navigate = useNavigate();

  const handleRefresh = () => {
    refresh();
  };

  const onClickSearch = () => {
    navigate('search');
  };

  const getStartDateTimeString = () => {
    if (jioFormValues?.date && jioFormValues?.startTiming) {
      return setDateTime(jioFormValues.date, jioFormValues.startTiming).toISOString();
    }

    return undefined;
  };

  const getEndDateTimeString = () => {
    if (jioFormValues?.date && jioFormValues?.endTiming) {
      return setDateTime(jioFormValues.date, jioFormValues.endTiming).toISOString();
    }

    return undefined;
  };

  return (
    <Box sx={{ pt: 5, pb: 100, maxWidth: 600, margin: '0 auto' }}>
      <TabContext value={tabValue}>
        <Button
          sx={{ borderRadius: 30, justifyContent: 'flex-start' }}
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
          startIcon={<Iconify icon="eva:search-outline" />}
          onClick={onClickSearch}
        >
          <Typography sx={{ ml: 1, fontSize: 16 }} variant="button">
            Search
          </Typography>
        </Button>
        <Grid sx={{ pt: 1.5 }} container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => {
                setTabValue(newValue);
              }}
            >
              {TABS.map((tab) => (
                <StyledTab key={tab} label={tab} value={tab} />
              ))}
            </Tabs>
          </Grid>
          <Grid item>
            <Button sx={{ borderRadius: 10 }} variant="outlined" onClick={handleRefresh}>
              Refresh
            </Button>
          </Grid>
        </Grid>
        {/* Open Jios Tab */}
        <TabPanel value={TabValue.Open}>
          <JioCardList
            searchParams={{
              type: jioFormValues?.type,
              numPasses: jioFormValues?.numPasses,
              gymId: jioFormValues?.gymId,
              startDateTime: getStartDateTimeString(),
              endDateTime: getEndDateTimeString(),
            }}
          />
        </TabPanel>
        {/* My Jios Tab */}
        <TabPanel value={TabValue.MyJios}>
          <MyJioCardList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
