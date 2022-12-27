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
  const logoSize = 60

  const GymAvatar = () => {
    if (data.logoUrl) {
      return <Avatar src={data.logoUrl} alt={data.name} sx={{width: logoSize, height: logoSize}}/>;
    } else {
      return <Iconify icon={'eva:pin-outline'} width={logoSize} height={logoSize} />;
    }
  };

  return (
    <CardHeader
      avatar={<GymAvatar />}
      title={<Typography variant="h5">{data.name}</Typography>}
    />
  );
}
