import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { listMyJios } from '../../../store/reducers/myJios';
import { useDispatch, useSelector } from '../../../store';
import MyJioCard from './MyJioCard';
import JioCardSkeleton from './JioCardSkeleton';
import EmptyContent from '../../../components/EmptyContent';

export default function MyJioCardList() {
  const dispatch = useDispatch();
  const myJiosData = useSelector((state) => state.myJios);
  const displayedData = React.useMemo(() => {
    if (myJiosData.error) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <EmptyContent sx={{ py: 3 }} title="There's an error" />
            <Button variant="contained">Contact Support</Button>
          </div>
        </Grid>
      );
    }

    if (myJiosData.loading) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCardSkeleton />
        </Grid>
      );
    }

    if (myJiosData.data.length === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <EmptyContent sx={{ py: 3 }} title="You have no Jios." />
          <Button variant="contained">Create a Jio</Button>
        </div>
      );
    }

    return myJiosData.data.map((jio) => (
      <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
        <MyJioCard data={jio} />
      </Grid>
    ));
  }, [myJiosData.data, myJiosData.error, myJiosData.loading]);

  React.useEffect(() => {
    dispatch(listMyJios());
  }, [dispatch]);

  return (
    <Grid container sm={12}>
      {displayedData}
    </Grid>
  );
}
