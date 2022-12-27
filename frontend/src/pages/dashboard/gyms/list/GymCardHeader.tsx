import { CardHeader, Stack, Typography } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { Link } from 'react-router-dom';
import { Jio } from 'src/@types/jio';
import { GymCardData } from './types/gymCard';
import Avatar from 'src/theme/overrides/Avatar';
import src from 'react-select/dist/declarations/src';
import Iconify from 'src/components/Iconify';

interface GymCardHeaderProps {
  data: GymCardData;
}

export default function GymCardHeader({ data }: GymCardHeaderProps) {
  return (
    <CardHeader
      // avatar={<Image sx={{ width: '100%', height: 'auto' }} src={src} alt={name} />}
      avatar={<Iconify icon={'eva:pin-outline'} width={20} height={20} />}
      title={<Typography variant="h6">{data.name}</Typography>}
      // avatar={
      //   <div className='jio-card-avatar'>
      //   <Stack
      //     sx={{
      //       textDecoration: 'none',
      //       color: 'inherit',
      //     }}
      //     spacing={1}
      //     direction="row"
      //     alignItems="center"
      //   >
      //     <Typography variant="h6">{`@${data.name}`}</Typography>
      //   </Stack>
      //   </div>
      // }
    />
  );
}
