import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import useVersion from 'src/hooks/useVersion';
import JioCard from './JioCard';
import JioCardSkeleton from './JioCardSkeleton';
import EmptyJiosContent from './EmptyJiosContent';
import { setDateTime } from 'src/utils/formatTime';
import EmptyContent from 'src/components/EmptyContent';
import { useDispatch, useSelector } from 'src/store';
import { listJios, ListJiosArgs } from 'src/store/reducers/jios';

export default function JioCardList() {
  const dispatch = useDispatch();
  const version = useVersion();
  const jioFormValues = useSelector((state) => state.jioFormValues.data);

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
    // TODO: move to utils?
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
    const searchParams: ListJiosArgs = {
      type: jioFormValues?.type,
      numPasses: jioFormValues?.numPasses,
      gymId: jioFormValues?.gymId,
      startDateTime: getStartDateTimeString(),
      endDateTime: getEndDateTimeString(),
    };

    dispatch(listJios(searchParams));
  }, [
    version,
    dispatch,
    jioFormValues?.type,
    jioFormValues?.numPasses,
    jioFormValues?.gymId,
    jioFormValues?.date,
    jioFormValues?.startDateTime,
    jioFormValues?.endDateTime,
  ]);

  return <Grid container>{displayedData}</Grid>;
}
