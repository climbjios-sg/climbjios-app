import { FileRejection } from 'react-dropzone';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
import getFileData from '../../utils/getFileData';

// ----------------------------------------------------------------------

type Props = {
  fileRejections: FileRejection[];
};

export default function RejectionFiles({ fileRejections }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = getFileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size ? fData(size) : ''}
            </Typography>

            {errors.map((error) => (
              <Box key={error.code} component="li" sx={{ typography: 'caption' }}>
                {error.message}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}
