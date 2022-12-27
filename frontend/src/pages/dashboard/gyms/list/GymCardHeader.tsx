import { CardHeader, Stack, Typography, Avatar } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { Link } from 'react-router-dom';
import { Jio } from 'src/@types/jio';
import { GymCardData } from './types/gymCard';
import src from 'react-select/dist/declarations/src';
import Iconify from 'src/components/Iconify';

interface GymCardHeaderProps {
  data: GymCardData;
}

export default function GymCardHeader({ data }: GymCardHeaderProps) {
  const GymAvatar = () => {
    if (data.logoUrl) {
      return <Avatar src={data.logoUrl} alt={data.name} sx={{width: 30, height: 30}}/>;
    } else {
      return <Iconify icon={'eva:pin-outline'} width={30} height={30} />;
    }
  };

  return (
    <CardHeader
      avatar={<GymAvatar />}
      title={<Typography variant="h5">{data.name}</Typography>}
    />
  );
}
