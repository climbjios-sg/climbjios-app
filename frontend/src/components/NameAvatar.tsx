import { Avatar, Modal, Stack, SxProps, IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';

interface NameAvatarProps {
  name: string;
  src?: string;
  sx?: SxProps<Theme>;
}

// NameAvatar generates an avatar based on name if image src is not found
export default function NameAvatar({ name, src, sx }: NameAvatarProps) {
  const [open, setOpen] = useState(false);

  if (src) {
    return (
      <>
        <Avatar
          src={src}
          alt={name}
          sx={sx}
          onClick={() => {
            setOpen(true);
          }}
        />
        <Modal
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Stack sx={{ width: '90vw', maxWidth: 500 }}>
            <Image sx={{ width: '100%', height: 'auto' }} src={src} alt={name} />
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
          </Stack>
        </Modal>
      </>
    );
  }

  return <Avatar sx={sx}>{name[0]}</Avatar>;
}
