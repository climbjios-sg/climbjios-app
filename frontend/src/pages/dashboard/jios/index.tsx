import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Fab, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import JioCardList from './JioCardList';
import MyJioCardList from './MyJioCardList';
import { ListJiosArgs } from '../../../store/reducers/jios';
import useRefresh from 'src/hooks/useRefresh';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/routes/paths';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

enum TabValue {
  Open = 'Open',
  MyJios = 'My Jios',
}

export default function Jios() {
  const [listJiosSearchParams, setListJiosSearchParams] = React.useState<ListJiosArgs>({});
  const TABS: TabValue[] = [TabValue.Open, TabValue.MyJios];
  const [tabValue, setTabValue] = React.useState<TabValue>(TabValue.Open);
  const refresh = useRefresh();
  const navigate = useNavigate();

  const handleRefresh = () => {
    refresh();
  };

  const onClickSearch = () => {
    navigate('search');
  }

  const onClickCreateJio = () => {
    navigate('create');
  }

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
          <JioCardList searchParams={listJiosSearchParams} />
        </TabPanel>
        {/* My Jios Tab */}
        <TabPanel value={TabValue.MyJios}>
          <MyJioCardList />
        </TabPanel>
      </TabContext>
      <Fab color="secondary" aria-label="add" size='large' sx={{ position: 'fixed', right: 10, bottom: 70, flexDirection: 'column' }} onClick={onClickCreateJio}>
        <Iconify icon="carbon:add" />
        <Typography variant='body2' sx={{ fontSize: 10 }}>Create a Jio</Typography>
      </Fab>
    </Box>
  );
}
