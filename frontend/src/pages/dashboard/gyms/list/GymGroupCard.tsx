// import { Avatar, Box, Card, CardContent, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import GymGroupCardHeader from './GymGroupCardHeader';
import { GymGroupCardData, GymGroupCardOutletData } from '../../../../@types/gymGroupCard';
import palette from 'src/theme/palette';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_GYM } from 'src/routes/paths';

interface GymGroupCardProps {
  data: GymGroupCardData;
}

export default function GymGroupCard({ data: itemData }: GymGroupCardProps) {
  let showHeaderIcon = true;
  for (const v of itemData.gymOutlets) {
    if (v.iconUrl) {
      showHeaderIcon = false;
      break;
    }
  }
  if (!showHeaderIcon) {
    itemData.iconUrl = undefined;
  }

  const iconSize = 25;

  return (
    <Card>
      <GymGroupCardHeader data={itemData} />
      {/* <Stack spacing={1.5} sx={{ px: 3, pb: 3, pt: 2 }}> */}
      <CardContent sx={{ pt: 1 }}>
        {itemData.gymOutlets.map((gymOutlet: GymGroupCardOutletData) => (
          <CardActionArea
            key={gymOutlet.id}
            component={RouterLink}
            to={PATH_GYM.general.gym(gymOutlet.id)}
          >
            <Box sx={{ width: '100%', mt: 2 }}>
              <Stack direction="row" sx={{ textDecoration: 'none', color: 'inherit' }}>
                {gymOutlet.iconUrl ? (
                  <Avatar
                    src={gymOutlet.iconUrl}
                    alt={gymOutlet.name}
                    sx={{ width: iconSize, height: iconSize, mr: 2 }}
                  />
                ) : (
                  <IconStyle
                    icon={'eva:pin-outline'}
                    color={palette.light.grey[700]}
                    sx={{ width: iconSize, height: iconSize }}
                  />
                )}

                <Stack direction="column">
                  <Typography variant="subtitle1">{gymOutlet.name}</Typography>
                  {/* <MuiLink
                  target="_blank"
                  href={'https://www.google.com/maps/search/?api=1&query=' + gymOutlet.address}
                  variant="body2"
                >
                  {gymOutlet.address}
                </MuiLink> */}
                  <Typography variant="body2">{gymOutlet.address}</Typography>
                  <Typography variant="body2">
                    {gymOutlet.area ? `(${gymOutlet.area})` : ''}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </CardActionArea>
        ))}
      </CardContent>
      {/* </Stack> */}
    </Card>
  );
}
