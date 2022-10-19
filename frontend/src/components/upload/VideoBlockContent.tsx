// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import { VideoUploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' }, px: { md: 5 } }}
    >
      <VideoUploadIllustration sx={{ width: 220 }} />
      <Box sx={{ px: 5, py: 3 }}>
        <Typography gutterBottom variant="h5">
          Click here to upload your Beta video
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Make sure it's less than 1 minute and less than 200MB
        </Typography>
      </Box>
    </Stack>
  );
}
