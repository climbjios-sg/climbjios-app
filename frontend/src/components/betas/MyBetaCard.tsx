import React, { useState } from 'react';
// @mui
import { Stack, IconButton } from '@mui/material';
// components
import { Beta } from '../../@types/beta';
import Iconify from '../Iconify';
import useRefresh from '../../hooks/ui/useRefresh';
import { useSnackbar } from 'notistack';
import { deleteBeta } from '../../services/betas';
import useSafeRequest from '../../hooks/services/useSafeRequest';
import DeleteMyBetaDialog from './CloseMyBetaDialog';
import BetaCaseBase from './BetaCardBase';

// ----------------------------------------------------------------------

type Props = {
  data: Beta;
};

// Memoizing content since it will be rendered in a infinite list
const MyBetaCard = React.memo(({ data }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const refresh = useRefresh();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { run: submitCloseMyBeta } = useSafeRequest(deleteBeta, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Deleted Beta!');
      refresh();
    },
  });

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    setIsDialogOpen(false);
    submitCloseMyBeta(data.id);
  };

  return (
    <BetaCaseBase
      data={data}
      bottom={
        <>
          <Stack sx={{ background: 'white' }} direction="row" justifyContent="center">
            <IconButton onClick={handleOpenDialog}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Stack>
          <DeleteMyBetaDialog
            isOpen={isDialogOpen}
            onCancel={handleDialogCancel}
            onConfirm={handleDelete}
          />
        </>
      }
    />
  );
});

export default MyBetaCard;
