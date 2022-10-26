import { useDropzone } from 'react-dropzone';
import { Box, Container } from '@mui/material';
import { UploadProps } from './type';
import RejectionFiles from './RejectionFiles';
import VideoBlockContent from './VideoBlockContent';
import DropZoneStyle from "./DropZoneStyle";

// ----------------------------------------------------------------------

export function UploadSingleFileVideo({
  error = false, file, helperText, sx, ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
          ...(file && {
            padding: '12% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {file ? (
          <Container
            sx={{
              width: '80vw',
              height: 300,
            }}
          >
            <video
              autoPlay
              muted
              loop
              src={typeof file === 'string' ? file : file.preview}
              style={{
                top: 8,
                left: 8,
                borderRadius: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }} />
          </Container>
        ) : (
          <VideoBlockContent />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {helperText && helperText}
    </Box>
  );
}
