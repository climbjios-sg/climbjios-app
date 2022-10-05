import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardHeader, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { listJios } from '../../store/reducers/jios';
import { useDispatch, useSelector } from '../../store';
import Iconify from '../../components/Iconify';
import { IconStyle } from '../../sections/@dashboard/user/profile/common';
import { Jio } from '../../@types/jio';
import palette from '../../theme/palette';
import { formatStartEndDate } from '../../utils/formatTime';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

interface JioCardProps {
  data: Jio;
}

function JioCard({ data }: JioCardProps) {
  return (
    <Card>
      <CardHeader title={data.user.name} subheader={`@${data.user.username}`} />
      <Stack spacing={1.5} sx={{ pl: 3, pb: 3, pt: 2 }}>
        <Stack direction="row">
          <IconStyle icon={'mingcute:coupon-fill'} color={palette.light.grey[700]} />
          <Typography variant="body2">
            {data.isBuy ? `Buying ${data.numPasses} passes` : `Selling ${data.numPasses} passes`}
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'eva:pin-outline'} color={palette.light.grey[700]} />
          <Typography variant="body2">{data.gym.name}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'eva:calendar-outline'} color={palette.light.grey[700]} />
          <Typography variant="body2">{formatStartEndDate(data.startDateTime, data.endDateTime)}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default function Jios() {
  const TABS = ['Open', 'My Jios'];
  const [tabValue, setTabValue] = React.useState(TABS[0]);
  const dispatch = useDispatch();
  const jiosData = useSelector((state) => state.jios);

  React.useEffect(() => {
    dispatch(listJios({}));
  }, [dispatch]);

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
          <Grid container sm={12}></Grid>
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
