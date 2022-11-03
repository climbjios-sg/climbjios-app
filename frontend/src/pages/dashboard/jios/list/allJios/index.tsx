import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button, Divider } from '@mui/material';
import useVersion from 'src/hooks/ui/useVersion';
import JioCard from 'src/components/jios/JioCard';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import EmptyJiosContent from 'src/components/jios/EmptyJiosContent';
import EmptyContent from 'src/components/EmptyContent';
import { useDispatch, useSelector } from 'src/store';
import { listJios } from 'src/store/reducers/jios';
import { getDateTimeString } from 'src/utils/formatTime';
import { GetJioListRequest } from 'src/@types/jio';
import CreateJioButton from 'src/components/jios/CreateJioButton';

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
            <EmptyContent sx={{ py: 3 }} title="We have an error! That's embarassing 😢" />
            <Button variant="contained">Contact Support</Button>
          </div>
        </Grid>
      );
    }

    if (loading) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCardLoader />
        </Grid>
      );
    }

    // If no content
    if (data.length === 0) {
      // If is searching
      if (jioSearchValues !== null) {
        return (
          <EmptyJiosContent
            title="No Jios matched your search."
            description="You can create one based on your search filters."
          />
        );
      }

      // If not searching
      return <EmptyJiosContent title="No Jios now." description="Why not create one?" />;
    }

    return (
      <>
        {data.map((jio) => (
          <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
            <JioCard data={jio} />
          </Grid>
        ))}
        <Grid sx={{ width: '100%', mt: 4 }} item>
          <Divider textAlign="center">Can't find the right Jio? 🤔</Divider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 25,
            }}
          >
            <CreateJioButton />
          </div>
        </Grid>
      </>
    );
  }, [data, error, jioSearchValues, loading]);

  useEffect(() => {
    if (!jioSearchValues) {
      dispatch(
        listJios({})
      );
      return;
    }

    const { date, startTiming, endTiming, type, gymId } = jioSearchValues;

    const searchParams: GetJioListRequest = {
      gymId: gymId,
      startDateTime: getDateTimeString(date, startTiming),
      endDateTime: getDateTimeString(date, endTiming),
    };

    searchParams.type = type;

    dispatch(listJios(searchParams));
  }, [version, dispatch, jioSearchValues]);

  return <Grid container>{displayedData}</Grid>;
}
