import * as React from 'react';
import { Grid } from '@mui/material';
import { listMyJios } from '../../../store/reducers/myJios';
import { useDispatch, useSelector } from '../../../store';
import JioCard from './JioCard';

export default function MyJioCardList() {
  const dispatch = useDispatch();
  const myJiosData = useSelector((state) => state.myJios);

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
