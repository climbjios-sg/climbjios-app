import { CardHeader, Typography, Avatar } from '@mui/material';
import { GymGroupCardData } from '../../../../@types/gymGroupCard';
// import Iconify from 'src/components/Iconify';

interface GymGroupCardHeaderProps {
  data: GymGroupCardData;
}

export default function GymGroupCardHeader({ data }: GymGroupCardHeaderProps) {
  const logoSize = 60;

  const GymAvatar = () => {
    if (data.iconUrl) {
      return (
        <Avatar src={data.iconUrl} alt={data.name} sx={{ mr: -1, width: logoSize, height: logoSize }} />
      );
    } else {
      return <div/>
      // return <Iconify icon={'eva:pin-outline'} width={logoSize} height={logoSize} />;
    }
  };

  return (
    <CardHeader avatar={<GymAvatar />} title={<Typography variant="h5">{data.name}</Typography>} />
  );
}
