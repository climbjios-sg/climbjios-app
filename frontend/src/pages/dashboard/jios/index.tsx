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
import { useDispatch, useSelector } from '../../../store';
import { setJioFormValues } from '../../../store/reducers/jioFormValues';
import { setDateTime } from '../../../utils/formatTime';
import { createJio, updateJio } from 'src/services/jios';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';

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

  const dispatch = useDispatch();
  const refresh = useRefresh();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<TabValue>(TabValue.Open);
  const { enqueueSnackbar } = useSnackbar();
  const jioFormValues = useSelector((state) => state.jioFormValues.data);

  const { run: submitCreateJio } = useRequest(createJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Created!');
      refresh();
      navigate('');
    },
    onError: (error) => {
      // TODO: error snack bar?
      // TODO: handle FE validation checks
      enqueueSnackbar('Failed to create', { variant: 'error' });
    },
  });
  const { run: submitUpdateJio } = useRequest(updateJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Updated!');
      refresh();
      navigate('');
    },
    onError: () => {
      enqueueSnackbar('Failed to update', { variant: 'error' });
    },
  });

  const handleRefresh = () => {
    refresh();
  };

  const onClickSearch = () => {
    navigate('search');
  };

  const handleSearch = async (data: JioFormValues) => {
    dispatch(setJioFormValues(data));
    navigate('');
  };

  const handleCreate = async (data: JioFormValues) => {
    submitCreateJio(data);
  };

  const handleEdit = async (data: JioFormValues) => {
    // FIXME: replace dummy id
    submitUpdateJio(data, 0);
    // navigate('');
  };

  const getStartDateTimeString = () => {
    if (jioFormValues?.date && jioFormValues?.startDateTime) {
      return setDateTime(jioFormValues.date, jioFormValues.startDateTime).toISOString();
    }

    return undefined;
  };

  const getEndDateTimeString = () => {
    if (jioFormValues?.date && jioFormValues?.endDateTime) {
      return setDateTime(jioFormValues.date, jioFormValues.endDateTime).toISOString();
    }

    return undefined;
  };

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
        }
      />
    </Routes>
  );
}
