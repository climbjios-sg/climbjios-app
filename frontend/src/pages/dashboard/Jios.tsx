import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardHeader, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { listJios } from '../../store/reducers/jios';
import { useDispatch, useSelector } from '../../store';
import Iconify from '../../components/Iconify';
import { IconStyle } from '../../sections/@dashboard/user/profile/common';

const StyledTab = styled(Tab)({
  '&.MuiButtonBase-root': {
    marginRight: 16,
  },
});

function JioCard() {
  return (
    <Card>
      <CardHeader title="John Doe"  subheader="@johndoe"/>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={'eva:phone-fill'} />
          <Typography variant="body2">{'1244'}</Typography>
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
      <Grid container sm={12}>
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCard />
        </Grid>
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCard />
        </Grid>
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCard />
        </Grid>
      </Grid>
    </Box>
  );
}
