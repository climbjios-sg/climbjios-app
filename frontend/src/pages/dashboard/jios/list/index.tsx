import * as React from 'react';
import styled from '@emotion/styled';
import { TabContext, TabPanel } from '@mui/lab';
import { Tab, Button, Typography, Grid, Tabs, Box, IconButton, Chip } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from '../../../../components/Iconify';
import useRefresh from '../../../../hooks/useRefresh';
import { formatPrettyDate } from '../../../../utils/formatTime';
import JioCardList from './allJios/JioCardList';
import MyJioCardList from './myJios/MyJioCardList';
import { useDispatch, useSelector } from '../../../../store';
import { customShadows } from '../../../../theme/shadows';
import { clearJioSearchForm } from '../../../../store/reducers/jioSearchForm';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

enum TabValue {
  Open = 'Open',
  MyJios = 'My Jios',
}

export default function JiosList() {
  const gyms = useSelector((state) => state.gyms.data);
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);
  const TABS: TabValue[] = [TabValue.Open, TabValue.MyJios];
  const [tabValue, setTabValue] = React.useState<TabValue>(TabValue.Open);
  const dispatch = useDispatch();
  const refresh = useRefresh();
  const navigate = useNavigate();

  const handleRefresh = () => {
    refresh();
  };

  const onClickSearch = () => {
    navigate('search');
  };

  // Show button with filter if is searching, else show search button
  const renderButton = () => {
    if (jioSearchValues && jioSearchValues.gymId) {
      const gymName = gyms.find((gym) => gym.id === jioSearchValues.gymId)?.name;
      const dateTimeName = formatPrettyDate(
        jioSearchValues.date,
        jioSearchValues.startTiming,
        jioSearchValues.endTiming
      );

      return (
        <Button
          sx={{
            position: 'relative',
            borderRadius: 30,
            justifyContent: 'flex-start',
            background: 'white',
            boxShadow: customShadows.light.card,
            border: '1px solid rgba(145, 158, 171, 0.24)',
            overflow: 'hidden',
          }}
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
        >
          {gymName && <Chip sx={{ mr: 0.5 }} label={gymName} />}
          <Chip label={dateTimeName} />
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              width: 50,
              height: 50,
              background: 'white',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onClick={() => {
              dispatch(clearJioSearchForm());
            }}
          >
            <Iconify icon="eva:close-outline" />
          </IconButton>
        </Button>
      );
    } else {
      return (
        <Button
          sx={{
            borderRadius: 30,
            justifyContent: 'flex-start',
            background: 'white',
            boxShadow: customShadows.light.card,
          }}
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
      );
    }
  };

  return (
    <Box sx={{ pt: 5, pb: 100, maxWidth: 600, margin: '0 auto' }}>
      <TabContext value={tabValue}>
        {renderButton()}
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
  );
}
