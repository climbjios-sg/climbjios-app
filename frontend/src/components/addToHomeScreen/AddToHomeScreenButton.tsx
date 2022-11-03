import { useState } from 'react';
import { DialogAnimate } from 'src/components/animate';
import { Stack, Typography } from '@mui/material';
import { InlineIcon } from '@iconify/react';
import { isiOS, isPWA, isMobile } from 'src/utils/device';

interface RenderButtonProps {
  onClick: () => void;
}

interface AddToHomeScreenButtonProps {
  renderButton: (props: RenderButtonProps) => React.ReactNode;
}

export default function AddToHomeScreenButton({ renderButton }: AddToHomeScreenButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);
  // Application has already been installed, or user is accessing from a non-mobile device
  // Install button should not be displayed
  if (isPWA() || !isMobile()) {
    return <></>;
  }

  return (
    <>
      {renderButton({ onClick: handleOpenModal })}
      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
        {isiOS() ? (
          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography>
              Add the ClimbJios app to your device's homescreen for easy access anytime.
            </Typography>
            <Stack spacing={1}>
              <Typography>
                1. In Safari, tap on <InlineIcon icon="uil:upload-alt" />
              </Typography>
              <Typography>
                2. Select Add to Home Screen <InlineIcon icon="fluent:add-square-24-regular" />
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={3} sx={{ p: 3 }}>
            <Typography>
              Add the ClimbJios app to your device's homescreen for easy access anytime.
            </Typography>
            <Stack spacing={1}>
              <Typography>
                1. In the browser, tap on <InlineIcon icon="carbon:overflow-menu-vertical" />
              </Typography>
              <Typography>
                2. Select <InlineIcon icon="material-symbols:add-to-home-screen" /> Add to Home screen or{' '}
                <InlineIcon icon="material-symbols:add-to-home-screen" /> Install or{' '}
                <InlineIcon icon="material-symbols:add-to-home-screen" /> Install App
              </Typography>
            </Stack>
            <Typography>
              For older devices, tap on <InlineIcon icon="ci:home-alt-plus" /> next to the URL bar.
            </Typography>
          </Stack>
        )}
      </DialogAnimate>
    </>
  );
}
