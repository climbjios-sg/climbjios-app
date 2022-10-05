import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardHeader, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { listMyJios } from '../../../store/reducers/myJios';
import { useDispatch, useSelector } from '../../../store';
import Iconify from '../../../components/Iconify';
import { IconStyle } from '../../../sections/@dashboard/user/profile/common';
import { Jio } from '../../../@types/jio';
import palette from '../../../theme/palette';
import { formatStartEndDate } from '../../../utils/formatTime';
import JioCard from './JioCard';

export default function MyJioCardList() {
  const dispatch = useDispatch();
  const myJiosData = useSelector((state) => state.jios);

  React.useEffect(() => {
    dispatch(listMyJios());
  }, [dispatch]);

  return (
    <Grid container sm={12}>
      <Grid sx={{ width: '100%', mt: 2 }} item>
        {myJiosData.data.map((jio) => (
          <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
            <JioCard data={jio} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
