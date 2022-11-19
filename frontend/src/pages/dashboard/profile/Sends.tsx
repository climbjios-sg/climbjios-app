// @mui
import { Card, Grid, Typography } from '@mui/material';
// types
import { User } from 'src/@types/user';
import { Send } from 'src/@types/send';

type Props = {
  user: User,
  sends: Array<Send>,
}

export default function Sends({ user, sends }: Props) {
  if (!sends) {
    return (
      <Card sx={{ textAlign: 'left', px: 3, pb: 3 }}>
        <Typography>
          {`${user.name} hasn't posted any sends yet.`}
        </Typography>
      </Card>
    )
  }
  return (
    <Grid container spacing={3} justifyContent="center">
      {
        sends.map((send: Send, index: number) => (
          <Grid key={send.id} item xs={12} md={4}>
            <Card sx={{ textAlign: 'left', px: 3, pb: 3 }} />
          </Grid>
        ))
      }
    </Grid>
  );
}