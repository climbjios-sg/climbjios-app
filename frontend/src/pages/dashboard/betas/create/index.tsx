import { Box, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router';
import { BetaCreateEditFormValues } from 'src/@types/beta';
import Iconify from 'src/components/Iconify';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { postCreateBeta, uploadBetaVideoToCloudfare } from '../../../../services/betas';
import { useDispatch } from '../../../../store';
import { openMessageBar } from '../../../../store/reducers/messageBar';
import { refreshView } from '../../../../store/reducers/ui';
import BetaCreateEditForm from '../form/BetaCreateEditForm';

export default function BetaCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (beta: BetaCreateEditFormValues) => {
    navigate(PATH_DASHBOARD.general.betas.root);
    dispatch(
      openMessageBar({
        icon: 'game-icons:mountain-climbing',
        message: 'Uploading your beta...',
        loading: true,
      })
    );
    try {
      const cloudflareVideoUid = await uploadBetaVideoToCloudfare(beta.video as File);
      await postCreateBeta({
        cloudflareVideoUid,
        gymId: beta.gymId,
        wallId: beta.wallId,
        colorId: beta.colorId,
        gymGradeId: beta.gymGradeId,
      });
      dispatch(
        openMessageBar({
          icon: 'noto:party-popper',
          message: 'Woohoo! Uploaded your Beta!',
          autoHideDuration: 4000,
          enableCloseButton: true,
        })
      );
      // Refresh betas after fetch is done
      dispatch(refreshView());
    } catch (err) {
      dispatch(
        openMessageBar({
          icon: 'icon-park-outline:file-failed',
          message: 'Failed to upload your beta 😢. Try again!',
          autoHideDuration: 6000,
          enableCloseButton: true,
        })
      );
    }
  };
  return (
    <Stack direction="column" alignItems="center">
      <AppBar
        sx={{
          background: 'white',
          width: '100vw',
          maxWidth: 600,
          color: 'text.primary',
        }}
        position="static"
      >
        <Toolbar sx={{ pl: 1 }}>
          <IconButton
            sx={{ mr: 1 }}
            color="primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Iconify icon="eva:arrow-back-fill" color="primary" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Upload a Beta
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ pt: 5, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
        <BetaCreateEditForm onSubmit={handleSubmit} />
      </Box>
    </Stack>
  );
}
