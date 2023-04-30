// import { Avatar, Box, Card, CardContent, Stack, Typography, Link as MuiLink } from '@mui/material';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  // CardContent,
  Stack,
  Typography,
} from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { GymGroupCardData, GymGroupCardOutletData } from '../../../../@types/gymGroupCard';
import palette from 'src/theme/palette';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_GYM } from 'src/routes/paths';
import ExceptLastDivider from 'src/components/ExceptLastDivider';

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
    <Card sx={{ padding: 2, pl: 3, pb: 1, boxShadow: '3px 3px 10px -4px' }}>
      <Typography variant="h5">{itemData.name}</Typography>
      {itemData.gymOutlets.map((gymOutlet: GymGroupCardOutletData, index) => (
        <Stack key={gymOutlet.id}>
          <CardActionArea component={RouterLink} to={PATH_GYM.general.gym(gymOutlet.id)}>
            <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
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
                  <Typography variant="body2">{gymOutlet.address}</Typography>
                  <Typography variant="body2">
                    {gymOutlet.area ? `(${gymOutlet.area})` : ''}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </CardActionArea>
          <ExceptLastDivider length={itemData.gymOutlets.length} index={index} />
        </Stack>
      ))}
    </Card>
  );
}
