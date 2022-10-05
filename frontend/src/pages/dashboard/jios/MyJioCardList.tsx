import * as React from 'react';
import { Grid } from '@mui/material';
import { listMyJios } from '../../../store/reducers/myJios';
import { useDispatch } from '../../../store';
import MyJioCard from './MyJioCard';
import { Jio } from 'src/@types/jio';

export default function MyJioCardList() {
  const dispatch = useDispatch();
  // const myJiosData = useSelector((state) => state.myJios);

  const testData: Jio[] = [
    {
      id: 9,
      // userId: '4a6cbb45-0ab0-4133-991e-416ca79774c9',
      isBuy: true,
      numPasses: 1,
      price: 10,
      gymId: 30,
      openToClimbTogether: false,
      optionalNote: 'null',
      createdAt: '2022-10-05T02:58:39.169Z',
      updatedAt: '2022-10-05T02:58:39.169Z',
      isClosed: false,
      startDateTime: '2022-10-06T02:38:57.997Z',
      endDateTime: '2022-10-06T10:42:42.395Z',
      user: {
        id: '4a6cbb45-0ab0-4133-991e-416ca79774c9',
        name: 'John Doe',
        username: 'johndoe',
        telegramHandle: 'johndoetele',
      },
      gym: {
        id: 30,
        name: 'The Rock School (Our Tampines Hub)',
        permanentlyClosed: false,
      },
    },
  ];

  React.useEffect(() => {
    dispatch(listMyJios());
  }, [dispatch]);

  return (
    <Grid container sm={12}>
      <Grid sx={{ width: '100%', mt: 2 }} item>
        {testData.map((jio) => (
          <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
            <MyJioCard data={jio} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
