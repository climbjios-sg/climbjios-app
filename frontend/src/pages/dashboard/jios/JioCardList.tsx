import * as React from 'react';
import { Grid } from '@mui/material';
import { listJios } from '../../../store/reducers/jios';
import { useDispatch, useSelector } from '../../../store';
import JioCard from './JioCard';

export default function JioCardList() {
  const dispatch = useDispatch();
  const jiosData = useSelector((state) => state.jios);

  React.useEffect(() => {
    dispatch(listJios({}));
  }, [dispatch]);

  return (
    <Grid container sm={12}>
      <Grid sx={{ width: '100%', mt: 2 }} item>
        {jiosData.data.map((jio) => (
          <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
            <JioCard data={jio} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
