import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import useVersion from 'src/hooks/useVersion';
import JioCard from './JioCard';
import JioCardSkeleton from '../JioCardSkeleton';
import EmptyJiosContent from '../EmptyJiosContent';
import EmptyContent from 'src/components/EmptyContent';
import { useDispatch, useSelector } from 'src/store';
import { listJios, ListJiosArgs } from 'src/store/reducers/jios';
import { getDateTimeString } from 'src/utils/formatTime';

export default function JioCardList() {
  const dispatch = useDispatch();
  const version = useVersion();
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);

  const { data, error, loading } = useSelector((state) => state.jios);
  const displayedData = React.useMemo(() => {
    if (error) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <EmptyContent sx={{ py: 3 }} title="There's an error" />
            <Button variant="contained">Contact Support</Button>
          </div>
        </Grid>
      );
    }

    if (loading) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCardSkeleton />
        </Grid>
      );
    }

    if (data.length === 0) {
      return <EmptyJiosContent />;
    }

    return data.map((jio) => (
      <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
        <JioCard data={jio} />
      </Grid>
    ));
  }, [data, error, loading]);

  useEffect(() => {
    if (!jioSearchValues) {
      dispatch(listJios({}));
      return;
    }

    const { date, startTiming, endTiming, type, numPasses, gymId } = jioSearchValues;

    const searchParams: ListJiosArgs = {
      type: type,
      numPasses: numPasses,
      gymId: gymId,
      startDateTime: getDateTimeString(date, startTiming),
      endDateTime: getDateTimeString(date, endTiming),
    };

    dispatch(listJios(searchParams));
  }, [version, dispatch, jioSearchValues]);

  return (
    <Grid container>
      {displayedData}
    </Grid>
  );
}
