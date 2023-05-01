import { Button, Card, Stack, Typography } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { Jio } from 'src/@types/jio';
import palette from 'src/theme/palette';
import { formatStartEndDate } from 'src/utils/formatTime';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import JioCardHeader from 'src/components/jios/JioCardHeader';
import { makeUserProfileLinkProps } from 'src/pages/publicProfile';

interface JioCardProps {
  data: Jio;
  isHeaderLinkDisabled?: boolean;
  isButtonDisabled?: boolean;
  isUsernameHidden?: boolean;
}

export default function JioCard({
  data,
  isHeaderLinkDisabled = false,
  isUsernameHidden = false,
  isButtonDisabled = false,
}: JioCardProps) {
  return (
    <Card>
      <JioCardHeader
        data={data}
        isUsernameHidden={isUsernameHidden}
        isLinkDisabled={isHeaderLinkDisabled}
      />
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
        {Boolean(data.price) && (
          <Stack direction="row">
            <IconStyle icon={'eva:pricetags-outline'} color={palette.light.grey[700]} />
            <Typography variant="body2">{`$${data.price}/pass`}</Typography>
          </Stack>
        )}
        {data.openToClimbTogether && (
          <Stack direction="row">
            <IconStyle icon={'fluent:hand-wave-16-regular'} color={palette.light.grey[700]} />
            <Typography variant="body2">Open to climb together</Typography>
          </Stack>
        )}
        {data.optionalNote && (
          <Stack direction="row">
            <IconStyle icon={'eva:menu-2-outline'} color={palette.light.grey[700]} />
            <Typography variant="body2">{data.optionalNote}</Typography>
          </Stack>
        )}
        {!isButtonDisabled && (
          <Stack direction="row">
            <Button
              sx={{ mt: 1 }}
              fullWidth
              component={Link}
              startIcon={<Iconify icon="eva:message-circle-outline" />}
              variant="outlined"
              {...makeUserProfileLinkProps({
                user: data.creatorProfile,
                isShowFloatingButton: true,
              })}
            >
              <span>Message Climber</span>
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
