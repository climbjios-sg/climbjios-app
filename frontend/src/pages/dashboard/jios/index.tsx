import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Modal,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import JioCardList from './JioCardList';
import MyJioCardList from './MyJioCardList';
import JiosForm from './JiosForm';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

enum TabValue {
  Open = 'Open',
  MyJios = 'MyJios',
}

export default function Jios() {
  const TABS: TabValue[] = [TabValue.Open, TabValue.MyJios];
  const [tabValue, setTabValue] = React.useState<TabValue>(TabValue.Open);
  const [isSearching, setIsSearching] = React.useState(false);

  const onClickSearch = () => {
    console.log('Going to search form');
    setIsSearching(!isSearching);
    console.log(isSearching);
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
        <Modal
          open={isSearching}
          onClose={() => setIsSearching(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <JiosForm setIsSearching={setIsSearching} />
        </Modal>
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
            <Button sx={{ borderRadius: 10 }} variant="outlined">
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
