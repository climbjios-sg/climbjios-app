import * as React from 'react';
import { styled } from '@mui/system';
import { TabContext, TabPanel } from '@mui/lab';
import {
  Tab,
  Grid,
  Tabs,
  Box,
  Paper,
  Stack,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import JioCardList from './allJios';
import MyJioCardList from './myJios';
import { useSearchParams } from 'react-router-dom';
import useAddToHomeScreen from 'src/hooks/useAddToHomeScreen';
import JioSearch from './search';
import FloatingContainer from '../../../../components/FloatingContainer';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

export enum TabValue {
  AllJios = 'All Jios',
  MyJios = 'My Jios',
}

export default function JiosList() {
  const [searchParams] = useSearchParams();
  const getStartingTab = (): TabValue => {
    const tabParam = searchParams.get('tab');
    const tabValues: string[] = Object.values(TabValue);
    if (tabParam && tabValues.includes(tabParam)) {
      return tabParam as TabValue;
    }

    return TabValue.AllJios;
  };
  const TABS: TabValue[] = [TabValue.AllJios, TabValue.MyJios];
  const [tabValue, setTabValue] = React.useState<TabValue>(getStartingTab());
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
  });

  useAddToHomeScreen();

  return (
    <Box sx={{ pt: 2, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
      <TabContext value={tabValue}>
        <FloatingContainer>
          <Paper
            elevation={1}
            sx={{
              zIndex: 1000,
              margin: '0 auto',
              width: '100vw',
              maxWidth: '600px',
              px: 2,
              borderRadius: 0,
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Tabs
                  indicatorColor="secondary"
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
            </Grid>
            <Slide appear={false} direction="down" in={!trigger}>
              <Stack sx={{ display: trigger ? 'none' : 'flex' }}>
                {tabValue === TabValue.AllJios && <JioSearch />}
              </Stack>
            </Slide>
          </Paper>
        </FloatingContainer>
        {/* Open Jios Tab */}
        <TabPanel value={TabValue.AllJios}>
          <Stack sx={{ height: 210 }} />
          <JioCardList />
        </TabPanel>
        {/* My Jios Tab */}
        <TabPanel value={TabValue.MyJios}>
          <Stack sx={{ height: 40 }} />
          <MyJioCardList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
