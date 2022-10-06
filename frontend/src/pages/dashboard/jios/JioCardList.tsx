import * as React from 'react';
import { Grid, Button } from '@mui/material';
import { listJios } from '../../../store/reducers/jios';
import { useDispatch, useSelector } from '../../../store';
import JioCard from './JioCard';
import JioCardSkeleton from './JioCardSkeleton';
import EmptyContent from '../../../components/EmptyContent';

export default function JioCardList() {
  const dispatch = useDispatch();
  const jiosData = useSelector((state) => state.jios);
  const displayedData = React.useMemo(() => {
    if (jiosData.error) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <EmptyContent sx={{ py: 3 }} title="There's an error" />
            <Button variant="contained">Contact Support</Button>
          </div>
        </Grid>
      );
    }

    if (jiosData.loading) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCardSkeleton />
        </Grid>
      );
    }

    if (jiosData.data.length === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <EmptyContent sx={{ py: 3 }} title="There's no Jios now." />
          <Button variant="contained">Create a Jio</Button>
        </div>
      );
    }

    return jiosData.data.map((jio) => (
      <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
        <JioCard data={jio} />
      </Grid>
    ));
  }, [jiosData.data, jiosData.error, jiosData.loading]);

  React.useEffect(() => {
    dispatch(listJios({}));
  }, [dispatch]);

  return (
    <Grid container sm={12}>
      {displayedData}
    </Grid>
  );
}
