import * as React from 'react';
import { useEffect } from 'react';
import { Button, Divider, Grid } from '@mui/material';
import { listMyJios } from 'src/store/reducers/myJios';
import { useDispatch, useSelector } from 'src/store';
import MyJioCard from './MyJioCard';
import EmptyJiosContent from '../EmptyJiosContent';
import EmptyContent from 'src/components/EmptyContent';
import useVersion from 'src/hooks/useVersion';
import JioCardSkeleton from '../JioCardSkeleton';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../../routes/paths';

export default function MyJioCardList() {
  const dispatch = useDispatch();
  const version = useVersion();
  const { data, error, loading } = useSelector((state) => state.myJios);
  const myJiosData = data.filter((jio) => !jio.isClosed);
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

    if (myJiosData.length === 0) {
      return <EmptyJiosContent />;
    }

    return (
      <>
        {myJiosData.map((jio) => (
          <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
            <MyJioCard data={jio} />
          </Grid>
        ))}
        <Grid sx={{ width: '100%', mt: 4 }} item>
          <Divider textAlign="center">That's all your Jios 🧗</Divider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 25,
            }}
          >
            <Button
              component={Link}
              to={PATH_DASHBOARD.general.jios.create}
              variant="contained"
              fullWidth
              size="large"
            >
              Create Jio
            </Button>
          </div>
        </Grid>
      </>
    );
  }, [myJiosData, error, loading]);

  useEffect(() => {
    dispatch(listMyJios());
  }, [version, dispatch]);

  return <Grid container>{displayedData}</Grid>;
}
