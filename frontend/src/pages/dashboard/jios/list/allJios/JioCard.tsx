import { Avatar, Button, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { Jio } from 'src/@types/jio';
import palette from 'src/theme/palette';
import { formatStartEndDate } from 'src/utils/formatTime';
import { getPassesText } from '../utils';
import { Link } from 'react-router-dom';
import { PATH_USER } from 'src/routes/paths';

interface JioCardProps {
  data: Jio;
}

export default function JioCard({ data }: JioCardProps) {

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            alt={'Profile picture'}
            src={data.creatorProfile && data.creatorProfile.profilePictureUrl
                  ? data.creatorProfile.profilePictureUrl
                  : 'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_default.jpg'
            }
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              mx: 'auto',
            }}
          />
        }
        title={
          <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
              <Typography variant='h6'>{`@${data.creatorProfile.telegramHandle}`}</Typography>
            </Grid>
            <Grid item xs={6} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Stack spacing={1} direction="row">
                <Typography>{getPassesText(data)}</Typography>
                {(data.type === 'buyer' || data.type === 'seller') && <IconStyle icon={'gis:layer-stack'} color={palette.light.grey[700]} />}
              </Stack>
            </Grid>
          </Grid>
        }
      />
      <Stack spacing={1.5} sx={{ px: 3, pb: 3, pt: 2 }}>
        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} color={palette.light.grey[700]} />
          <Typography variant="body2">{data.gym.name}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'eva:calendar-fill'} color={palette.light.grey[700]} />
          <Typography variant="body2">
            {formatStartEndDate(data.startDateTime, data.endDateTime)}
          </Typography>
        </Stack>
        {data.openToClimbTogether && (
          <Stack direction="row">
            <IconStyle icon={'bxs:like'} color={palette.light.grey[700]} />
            <Typography variant="body2">Open to climb together</Typography>
          </Stack>
        )}
        {data.optionalNote && (
          <Stack direction="row">
            <IconStyle icon={'eva:menu-2-fill'} color={palette.light.grey[700]} />
            <Typography variant="body2">{data.optionalNote}</Typography>
          </Stack>
        )}
        <Stack direction="row">
          <Button
            sx={{ mt: 1 }}
            fullWidth
            component={Link}
            to={`${PATH_USER.root}/${data.creatorProfile.userId}`}
            variant="outlined"
          >
            <span>Request Pass</span>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
