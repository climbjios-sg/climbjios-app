import * as React from 'react';
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
import { useDispatch, useSelector } from '../../../store';
import { setJioFormValues } from '../../../store/reducers/jioFormValues';
import { setDateTime } from '../../../utils/formatTime';

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
  const dispatch = useDispatch();
  const jioFormValues = useSelector(state => state.jioFormValues.data)
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

  const handleSearch = async (data: JioFormValues) => {
    dispatch(setJioFormValues(data))
    navigate('');
  };

  const handleCreate = async (data: JioFormValues) => {
    console.log(data)
  };

  const handleEdit = async (data: JioFormValues) => {
    console.log(data)
  };

  const getStartDateTimeString = () => {
    if (jioFormValues?.date && jioFormValues?.startTiming) {
      return setDateTime(jioFormValues.date, jioFormValues.startTiming).toUTCString()
    }

    return '';
  }

  const getEndDateTimeString = () => {
    if (jioFormValues?.date && jioFormValues?.endTiming) {
      return setDateTime(jioFormValues.date, jioFormValues.endTiming).toUTCString()
    }

    return '';
  }


  return (
    <Routes>
      <Route
        path="search"
        element={
          <JiosForm
            isSearch
            onSubmit={handleSearch}
            submitLabel="Search"
            submitIcon={<Iconify icon={'eva:search-outline'} width={24} height={24} />}
            defaultValues={jioFormValues || undefined}
          />
        }
      />
      <Route
        path="create"
        element={
          <JiosForm
            onSubmit={handleCreate}
            submitLabel="Submit"
            submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
          />
        }
      />
      <Route
        path="edit/:id"
        element={
          <JiosForm
            onSubmit={handleEdit}
            submitLabel="Submit"
            submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
          />
        }
      />
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
                <JioCardList searchParams={{
                  type: jioFormValues?.type,
                  numPasses: jioFormValues?.numPasses,
                  gymId: jioFormValues?.gymId,
                  startDateTime: getStartDateTimeString(),
                  endDateTime: getEndDateTimeString(),
                }} />
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
