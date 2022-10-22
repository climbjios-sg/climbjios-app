import * as React from 'react';
import { Avatar, Button, Card, CardHeader, Stack, Typography } from '@mui/material';
import Iconify from '../../../../../components/Iconify';
import { IconStyle } from 'src/utils/common';
import { Jio } from '../../../../../@types/jio';
import palette from '../../../../../theme/palette';
import { formatStartEndDate } from '../../../../../utils/formatTime';
import { getPassesText } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_USER } from 'src/routes/paths';

interface JioCardProps {
  data: Jio;
}

export default function JioCard({ data }: JioCardProps) {
  const navigate = useNavigate();
  const onClickProfilePic = () => navigate('/profile');

  return (
    <Card>
      <CardHeader
        avatar={
          // <IconButton onClick={onClickProfilePic}>
          <Avatar
            alt={'Profile picture'}
            src={
              'https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_default.jpg'
            }
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              mx: 'auto',
            }}
          />
          // </IconButton>
        }
        title={data.creatorProfile.name}
        subheader={`@${data.creatorProfile.telegramHandle}`} />
      <Stack spacing={1.5} sx={{ px: 3, pb: 3, pt: 2 }}>
        <Stack direction="row">
          <IconStyle icon={'eva:pin-outline'} color={palette.light.grey[700]} />
          <Typography variant="body2">{data.gym.name}</Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'eva:calendar-outline'} color={palette.light.grey[700]} />
          <Typography variant="body2">
            {formatStartEndDate(data.startDateTime, data.endDateTime)}
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'mingcute:coupon-line'} color={palette.light.grey[700]} />
          <Typography variant="body2">{getPassesText(data)}</Typography>
        </Stack>
        {Boolean(data.price) && (
          <Stack direction="row">
            <IconStyle icon={'eva:pricetags-outline'} color={palette.light.grey[700]} />
            <Typography variant="body2">{`$${data.price}/pass`}</Typography>
          </Stack>
        )}
        {data.openToClimbTogether && (
          <Stack direction="row">
            <IconStyle icon={'fluent:hand-wave-16-regular'} color={palette.light.grey[700]} />
            <Typography variant="body2">Open Jio to climb together!</Typography>
          </Stack>
        )}
        {data.optionalNote && (
          <Stack direction="row">
            <IconStyle icon={'eva:message-square-outline'} color={palette.light.grey[700]} />
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
