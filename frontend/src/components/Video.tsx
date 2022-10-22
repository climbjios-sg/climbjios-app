// @mui
import { Theme } from '@mui/material/styles';
import { Box, IconButton, Modal, SxProps } from '@mui/material';
import * as React from 'react';
import 'video.js/dist/video-js.css';
import { Stream } from '@cloudflare/stream-react';
import Iconify from './Iconify';

interface Props {
  src: string;
  sx?: SxProps<Theme>;
}

export default function Video({ sx, src }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box
      component="div"
      sx={{
        width: 1,
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        maxHeight: 800,
        '& .wrapper': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          lineHeight: 0,
          position: 'absolute',
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
    >
      <Box
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 1000,
        }}
        onClick={() => {
          setOpen(true);
        }}
      />
      <Box component={Stream} sx={{ width: '100%', objectFit: 'cover' }} src={src} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <IconButton
            sx={{
              position: 'absolute',
              right: 10,
              top: 10,
              zIndex: 100000,
              background: 'white',
              '&:hover': { background: 'white' },
            }}
            size="large"
            aria-label="close"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              px: 30,
              py: 5,
              height: '100%',
              '& div': { paddingTop: '0 !important', position: 'static !important' },
            }}
          >
            <Stream src={src} autoplay muted controls />
          </Box>
        </>
      </Modal>
    </Box>
  );
}
