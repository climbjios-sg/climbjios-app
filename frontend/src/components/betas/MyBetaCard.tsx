import React, { useState } from 'react';
// @mui
import { Box, Card, Avatar, Typography, Stack, Divider, IconButton } from '@mui/material';
// components
import { Beta } from '../../@types/beta';
import Video from '../Video';
import { Link } from 'react-router-dom';
import { makeUserProfileLinkProps } from '../../pages/publicProfile';
import Iconify from '../Iconify';
import useRefresh from '../../hooks/ui/useRefresh';
import { useSnackbar } from 'notistack';
import { deleteBeta } from '../../services/betas';
import useSafeRequest from '../../hooks/services/useSafeRequest';
import DeleteMyBetaDialog from './CloseMyBetaDialog';

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
    <Card sx={{ background: 'black', height: '100%' }}>
      <Stack direction="column">
        <Box sx={{ position: 'relative', height: '100%' }}>
          <Stack
            component={Link}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              left: 8,
              zIndex: 1001,
              top: 6,
              position: 'absolute',
            }}
            direction="row"
            alignItems="center"
            {...makeUserProfileLinkProps({ user: data.creatorProfile })}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1,
              }}
              alt={data.creatorProfile.telegramHandle}
              src={data.creatorProfile.profilePictureUrl}
            />
            <Typography
              color="white"
              variant="subtitle2"
            >{`@${data.creatorProfile.telegramHandle}`}</Typography>
          </Stack>
          <Video videoSrc={data.cloudflareVideoUid} thumbnailSrc={data.thumbnailUrl} />
          <Stack
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              color: 'white',
              backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5))',
              paddingBottom: 2,
              paddingTop: 1,
              paddingLeft: 2,
              width: '100%',
            }}
            direction="row"
            spacing={1}
            divider={<Divider color="white" orientation="vertical" flexItem />}
          >
            {[data.gym.name, data.gymGrade.name].map((text) => (
              <Typography variant="caption" key={text}>
                {text}
              </Typography>
            ))}
          </Stack>
        </Box>
        <Stack sx={{ background: 'white' }} direction="row" justifyContent="center">
          <IconButton onClick={handleOpenDialog}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </Stack>
      </Stack>
      <DeleteMyBetaDialog
        isOpen={isDialogOpen}
        onCancel={handleDialogCancel}
        onConfirm={handleDelete}
      />
    </Card>
  );
});

export default MyBetaCard;
