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
import { clearJiosSearchForm } from '../../../../store/reducers/jiosSearchForm';
import { Jio } from '../../../../@types/jio';
import { IconStyle } from '../../../../sections/@dashboard/user/profile/common';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSearchParams } from 'react-router-dom';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

export enum TabValue {
  AllJios = 'All Jios',
  MyJios = 'My Jios',
}

const jioTypePillMap: Record<Jio['type'], string> = {
  buyer: "I'm buying passes",
  seller: "I'm selling passes",
  other: 'Not buying/selling passes',
};

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
  const gyms = useSelector((state) => state.gyms.data);
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);
  const TABS: TabValue[] = [TabValue.AllJios, TabValue.MyJios];
  const [tabValue, setTabValue] = React.useState<TabValue>(getStartingTab());
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
    if (jioSearchValues) {
      const { date, startTiming, endTiming, gymId } = jioSearchValues;
      const dateTimeName = formatPrettyDate(date, startTiming, endTiming);

      return (
        <div
          style={{
            position: 'relative',
            borderRadius: 30,
            justifyContent: 'flex-start',
            background: 'white',
            boxShadow: customShadows.light.card,
            border: '1px solid rgba(145, 158, 171, 0.24)',
            fontWeight: 700,
            padding: '6px 8px',
          }}
        >
          <div
            style={{ display: 'flex', width: '100%', overflowX: 'scroll', paddingRight: 40 }}
            onClick={() => {
              navigate(PATH_DASHBOARD.general.jios.search);
            }}
          >
            {gymId && (
              <Chip
                sx={{ mr: 0.5 }}
                icon={<IconStyle icon={'eva:pin-outline'} />}
                label={gyms.find((gym) => gym.id === jioSearchValues.gymId)?.name}
              />
            )}
            <Chip
              sx={{ mr: 0.5 }}
              icon={<IconStyle icon={'eva:calendar-outline'} />}
              label={dateTimeName}
            />
            {jioSearchValues.type && (
              <Chip
                icon={<IconStyle icon={'mingcute:coupon-line'} />}
                label={jioTypePillMap[jioSearchValues.type]}
              />
            )}
          </div>
          <IconButton
            sx={{
              position: 'absolute',
              top: 0,
              right: 2,
              width: 45,
              height: 44,
              background: 'white',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            onClick={() => {
              dispatch(clearJiosSearchForm());
            }}
          >
            <Iconify icon="eva:close-outline" />
          </IconButton>
        </div>
      );
    } else {
      return (
        <Button
          sx={{
            borderRadius: 30,
            justifyContent: 'flex-start',
            background: 'white',
            boxShadow: customShadows.light.card,
            border: '1px solid rgba(145, 158, 171, 0.24)',
          }}
          variant="outlined"
          size="large"
          color="primary"
          fullWidth
          startIcon={<Iconify icon="eva:search-outline" />}
          onClick={onClickSearch}
        >
          <Typography sx={{ ml: 1, fontSize: 16 }} variant="button">
            Search ClimbJios...
          </Typography>
        </Button>
      );
    }
  };

  return (
    <Box sx={{ pt: 5, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
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
        <TabPanel value={TabValue.AllJios}>
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
