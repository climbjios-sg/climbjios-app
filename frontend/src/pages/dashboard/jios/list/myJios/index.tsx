import * as React from 'react';
import { useEffect } from 'react';
import { Divider, Grid } from '@mui/material';
import { listMyJios } from 'src/store/reducers/myJios';
import { useDispatch, useSelector } from 'src/store';
import MyJioCard from 'src/components/jios/MyJioCard';
import EmptyJiosContent from 'src/components/jios/EmptyJiosContent';
import useVersion from 'src/hooks/ui/useVersion';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import ErrorContent from 'src/components/jios/ErrorJiosContent';
import CreateJioButton from 'src/components/jios/CreateJioButton';

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
          <JioCardLoader />
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
          <Divider textAlign="center">That's all your Jios 🧗</Divider>
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
  }, [myJiosData, error, loading]);

  useEffect(() => {
    dispatch(listMyJios());
  }, [version, dispatch]);

  return <Grid container>{displayedData}</Grid>;
}
