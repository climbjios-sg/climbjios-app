import * as React from 'react';
import { Button, Card, CardHeader, Stack, Typography } from '@mui/material';
import Iconify from '../../../components/Iconify';
import { IconStyle } from '../../../sections/@dashboard/user/profile/common';
import { Jio } from '../../../@types/jio';
import palette from '../../../theme/palette';
import { formatStartEndDate } from '../../../utils/formatTime';

interface MyJioCardProps {
  data: Jio;
}

export default function MyJioCard({ data }: MyJioCardProps) {
  return (
    <Card>
      <CardHeader title={data.user.name} subheader={`@${data.user.username}`} />
      <Stack spacing={1.5} sx={{ px: 3, pb: 3, pt: 2 }}>
        <Stack direction="row">
          <IconStyle icon={'mingcute:coupon-fill'} color={palette.light.grey[700]} />
          <Typography variant="body2">
            {data.isBuy ? `Buying ${data.numPasses} passes` : `Selling ${data.numPasses} passes`}
          </Typography>
        </Stack>
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
        {data.openToClimbTogether && (
          <Stack direction="row">
            <IconStyle icon={'fluent:hand-wave-16-regular'} color={palette.light.grey[700]} />
            <Typography variant="body2">{'Open Jio to climb together'}</Typography>
          </Stack>
        )}
        {data.optionalNote && (
          <Stack direction="row">
            <IconStyle icon={'eva:message-square-outline'} color={palette.light.grey[700]} />
            <Typography variant="body2">{data.optionalNote}</Typography>
          </Stack>
        )}
        <Stack direction="row" spacing={1.5}>
          <Button fullWidth startIcon={<Iconify icon={'eva:edit-fill'} />} onClick={() => {}}>
            Edit
          </Button>
          <Button
            fullWidth
            color="error"
            startIcon={<Iconify icon={'eva:trash-2-outline'} />}
            onClick={() => {}}
          >
            Close
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}