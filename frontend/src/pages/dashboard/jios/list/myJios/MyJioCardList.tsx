import * as React from 'react';
import { useEffect } from 'react';
import { Button, Divider, Grid } from '@mui/material';
import { listMyJios } from 'src/store/reducers/myJios';
import { useDispatch, useSelector } from 'src/store';
import MyJioCard from './MyJioCard';
import EmptyJiosContent from '../EmptyJiosContent';
import useVersion from 'src/hooks/useVersion';
import JioCardSkeleton from '../JioCardSkeleton';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import ErrorContent from '../ErrorContent';

export default function MyJioCardList() {
  const dispatch = useDispatch();
  const version = useVersion();
  const { data, error, loading } = useSelector((state) => state.myJios);
  const myJiosData = data.filter((jio) => !jio.isClosed);
  const displayedData = React.useMemo(() => {
    if (error) {
      return <ErrorContent />;
    }

    if (loading) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCardSkeleton />
        </Grid>
      );
    }

    if (myJiosData.length === 0) {
      return <EmptyJiosContent title="You have no Jios." description="Why not try creating one?" />;
    }

    return (
      <>
        {myJiosData.map((jio) => (
          <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
            <MyJioCard data={jio} />
          </Grid>
        ))}
        <Grid sx={{ width: '100%', mt: 4 }} item>
          <Divider textAlign="center">That's all your ClimbJios 🧗</Divider>
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
              Create ClimbJio
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
