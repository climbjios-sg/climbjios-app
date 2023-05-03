// @mui
import { Stack, Card, Typography } from '@mui/material';
import { GymPass } from 'src/@types/gymPass';
import PassCard from './PassCard';
import ExceptLastDivider from 'src/components/ExceptLastDivider';

const PassesCard = ({ title, data }: { title: string; data: GymPass[] }) => (
  <Card sx={{ padding: 2, pl: 3, pb: 1 }}>
    <Stack spacing={2}>
      <Typography variant="h5">{title}</Typography>
      <Stack>
        {data.map((passData: GymPass, index) => (
          <Stack key={index}>
            {PassCard(passData)}
            <ExceptLastDivider length={data.length} index={index} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  </Card>
);

export default PassesCard;
