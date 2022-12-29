import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
// import { IconStyle } from 'src/utils/common';
// import { Jio } from 'src/@types/jio';
// import palette from 'src/theme/palette';
// import { formatStartEndDate } from 'src/utils/formatTime';
// import { Link } from 'react-router-dom';
// import Iconify from 'src/components/Iconify';
// import { makeUserProfileLinkProps } from 'src/pages/publicProfile';
import { IconStyle } from 'src/utils/common';
import GymCardHeader from './GymCardHeader';
import { GymCardData, GymOutletData } from './types/gymCard';
import palette from 'src/theme/palette';

interface GymCardProps {
  data: GymCardData;
}

export default function GymCard({ data }: GymCardProps) {
  return (
    <Card>
      <GymCardHeader data={data} />
      {/* <Stack spacing={1.5} sx={{ px: 3, pb: 3, pt: 2 }}> */}
      <CardContent sx={{ pt: 0 }}>
        {data.gymOutlets.map((gymOutlet: GymOutletData) => (
          <Box key={gymOutlet.gymId} sx={{ width: '100%', mt: 2 }}>
            <Stack direction="row">
              <IconStyle icon={'eva:pin-outline'} color={palette.light.grey[700]} />
              <Stack direction="column">
                <Typography variant="subtitle1">{gymOutlet.name}</Typography>
                <Typography variant="body2">{gymOutlet.address}</Typography>
              </Stack>
            </Stack>
          </Box>
        ))}
      </CardContent>
      {/* </Stack> */}
    </Card>
  );
}
