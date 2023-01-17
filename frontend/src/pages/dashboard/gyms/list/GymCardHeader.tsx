import { CardHeader, Typography, Avatar } from '@mui/material';
import { GymCardData } from './types/gymCard';
import Iconify from 'src/components/Iconify';

interface GymCardHeaderProps {
  data: GymCardData;
}

export default function GymCardHeader({ data }: GymCardHeaderProps) {
  const logoSize = 60;

  const GymAvatar = () => {
    if (data.logoUrl) {
      return (
        <Avatar src={data.logoUrl} alt={data.name} sx={{ width: logoSize, height: logoSize }} />
      );
    } else {
      return <Iconify icon={'eva:pin-outline'} width={logoSize} height={logoSize} />;
    }
  };

  return (
    <CardHeader avatar={<GymAvatar />} title={<Typography variant="h5">{data.name}</Typography>} />
  );
}
