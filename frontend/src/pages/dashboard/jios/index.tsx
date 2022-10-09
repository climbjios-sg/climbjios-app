import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import JioCardList from './JioCardList';
import MyJioCardList from './MyJioCardList';
import { ListJiosArgs } from '../../../store/reducers/jios';
import useRefresh from 'src/hooks/useRefresh';
import { Route, Routes, useNavigate } from 'react-router-dom';
import JiosForm, { JioFormValues } from './JiosForm';
import { setJioFormValues } from '../../../store/reducers/jioFormValues';
import { setDateTime } from '../../../utils/formatTime';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import JiosCreate from './JiosCreate';
import JiosEdit from './JiosEdit';
import JiosSearch from './JiosSearch';

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
  const TABS: TabValue[] = [TabValue.Open, TabValue.MyJios];

  const refresh = useRefresh();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<TabValue>(TabValue.Open);

  const handleRefresh = () => {
    refresh();
  };

  const onClickSearch = () => {
    navigate('search');
  };

  return (
    <Routes>
      <Route path="search" element={<JiosSearch />} />
      <Route path="create" element={<JiosCreate />} />
      <Route path="edit/:id" element={<JiosEdit />} />
      <Route
        path=""
        element={
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
                <JioCardList />
              </TabPanel>
              {/* My Jios Tab */}
              <TabPanel value={TabValue.MyJios}>
                <MyJioCardList />
              </TabPanel>
            </TabContext>
          </Box>
        }
      />
    </Routes>
  );
}
