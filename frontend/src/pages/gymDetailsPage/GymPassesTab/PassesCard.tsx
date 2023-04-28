// @mui
import { Stack, Card, Typography, Box } from '@mui/material';
import { GymPass } from 'src/@types/gymPass';
import PassCard from './PassCard';

const PassesCard = ({ title, data }: { title: string; data: GymPass[] }) => (
  <Card sx={{ padding: 2, pl: 3 }}>
    <Stack spacing={2}>
      <Typography variant="h5">{title}</Typography>
      <Stack spacing={2}>
        {data.map((passData: GymPass, index) => (
          <Box key={index}>{PassCard(passData)}</Box>
        ))}
      </Stack>
    </Stack>
  </Card>
);

export default PassesCard;
