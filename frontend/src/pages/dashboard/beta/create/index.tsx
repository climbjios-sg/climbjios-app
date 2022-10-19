import { Box, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Iconify from '../../../../components/Iconify';
import useErrorSnackbar from '../../../../hooks/useErrorSnackbar';
import { getUploadUrl } from '../../../../services/betas';
import BetaCreateEditForm, { BetaFormValueProps } from '../form/BetaCreateEditForm';

export default function BetaCreate() {
  const snackbar = useErrorSnackbar();
  const navigate = useNavigate();
  const handleSubmit = async (data: BetaFormValueProps) => {
    try {
      const { data: uploadData } = await getUploadUrl();
      const formData = new FormData();
      formData.append('file', data.video as File);
      await axios.post(uploadData.uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      snackbar.enqueueWithSupport('Failed to create Beta.');
      throw err;
    }
  };
  return (
    <Box sx={{ pt: 5, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
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
      <Stack direction="column" alignItems="center">
        <BetaCreateEditForm onSubmit={handleSubmit} />
      </Stack>
    </Box>
  );
}
