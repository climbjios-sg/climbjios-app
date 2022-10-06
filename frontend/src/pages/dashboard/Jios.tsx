import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Grid,
  Modal,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { listJios } from '../../store/reducers/jios';
import { useDispatch, useSelector } from '../../store';
import Iconify from '../../components/Iconify';
import JiosForm from './JiosForm';
import JioCard from './jios/JioCard';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

export default function Jios() {
  const TABS = ['Open', 'My Jios'];
  const [tabValue, setTabValue] = React.useState(TABS[0]);
  const dispatch = useDispatch();
  const jiosData = useSelector((state) => state.jios);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    dispatch(listJios({}));
  }, [dispatch]);

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
        <TabPanel value={TABS[0]}>
          <Grid container sm={12}>
            <Grid sx={{ width: '100%', mt: 2 }} item>
              {jiosData.data.map((jio) => (
                <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
                  <JioCard data={jio} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </TabPanel>
        {/* My Jios Tab */}
        <TabPanel value={TABS[1]}>
          <Grid container sm={12} />
        </TabPanel>
        {/* {JSON.stringify(jiosData)}
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCard />
        </Grid>
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCard />
        </Grid>
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCard />
        </Grid> */}
      </TabContext>
    </Box>
  );
}
