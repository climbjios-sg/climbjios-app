import * as React from 'react';
import { useState } from 'react';
import { Button, Card, CardHeader, Stack, Typography } from '@mui/material';
import Iconify from 'src/components/Iconify';
import { IconStyle } from 'src/sections/@dashboard/user/profile/common';
import { Jio } from 'src/@types/jio';
import palette from 'src/theme/palette';
import { formatStartEndDate } from 'src/utils/formatTime';
import { getPassesText } from '../utils';
import CloseMyJioDialog from './CloseMyJioDialog';
import { useSnackbar } from 'notistack';
import useRefresh from 'src/hooks/useRefresh';
import { closeMyJio } from 'src/services/myJios';
import { useRequest } from 'ahooks';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Link } from 'react-router-dom';

interface MyJioCardProps {
  data: Jio;
}

export default function MyJioCard({ data }: MyJioCardProps) {
  const { enqueueSnackbar } = useSnackbar();
  const refresh = useRefresh();
  const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);
  const { run: submitCloseMyJio } = useRequest(closeMyJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Closed!');
      refresh();
    },
  });

  const handleClose = () => {
    setIsCloseDialogOpen(true);
  };

  const handleDialogCancel = () => {
    setIsCloseDialogOpen(false);
  };

  const handleDialogClose = () => {
    setIsCloseDialogOpen(false);
    submitCloseMyJio(data.id);
  };

  return (
    <Card>
      <CardHeader title={data.user.name} subheader={`@${data.user.username}`} />
      <Stack spacing={1.5} sx={{ px: 3, pb: 2, pt: 2 }}>
        <Stack direction="row">
          <IconStyle icon={'mingcute:coupon-fill'} color={palette.light.grey[700]} />
          <Typography variant="body2">{getPassesText(data)}</Typography>
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
            <Typography variant="body2">{'Open jio to climb together.'}</Typography>
          </Stack>
        )}
        {data.optionalNote && (
          <Stack direction="row">
            <IconStyle icon={'eva:message-square-outline'} color={palette.light.grey[700]} />
            <Typography variant="body2">{data.optionalNote}</Typography>
          </Stack>
        )}
        <Stack direction="row" spacing={1.5}>
          <Button
            component={Link}
            to={`${PATH_DASHBOARD.general.jios.edit}/${data.id}`}
            fullWidth
            startIcon={<Iconify icon={'eva:edit-fill'} />}
          >
            Edit
          </Button>
          <Button
            fullWidth
            color="error"
            startIcon={<Iconify icon={'eva:close-outline'} />}
            onClick={handleClose}
          >
            Close
          </Button>
        </Stack>
      </Stack>
      <CloseMyJioDialog
        isOpen={isCloseDialogOpen}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogClose}
      />
    </Card>
  );
}
