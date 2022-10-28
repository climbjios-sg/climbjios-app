import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router';
import { BetaCreateEditFormValues } from 'src/@types/beta';
import BackBar from 'src/components/BackBar';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { postCreateBeta, uploadBetaVideoToCloudfare } from 'src/services/betas';
import { useDispatch } from 'src/store';
import { openMessageBar } from 'src/store/reducers/messageBar';
import { pushMyLocalBetaVideo } from 'src/store/reducers/myLocalBetaVideos';
import { refreshView } from 'src/store/reducers/ui';
import { CustomFile } from 'src/components/upload';
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
      const { data } = await postCreateBeta({
        cloudflareVideoUid,
        gymId: beta.gymId,
        wallId: beta.wallId,
        colorId: beta.colorId,
        gymGradeId: beta.gymGradeId,
      });

      // Push beta video to store, so we don't have to refetch video when displaying it
      const betaVideo = beta.video as CustomFile;
      if (betaVideo.preview) {
        dispatch(
          pushMyLocalBetaVideo({
            betaId: data.id,
            videoUrl: betaVideo.preview,
          })
        );
      }
      
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
      <BackBar title="Upload a Beta" />
      <Box sx={{ pt: 11, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
        <BetaCreateEditForm onSubmit={handleSubmit} />
      </Box>
    </Stack>
  );
}
