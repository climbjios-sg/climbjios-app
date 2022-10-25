import { Box, Container, Stack } from '@mui/material';
import Image from 'src/components/Image';
import {
  TelegramUsernameIOSStep1,
  TelegramUsernameIOSStep2,
  TelegramUsernameIOSStep3,
} from 'src/assets/TelegramUsernameInstructions';

const imageStyle = {
  width: '40%',
  minWidth: 200,
};

export default function TelegramUsernameIOS() {
  return (
    <Container sx={{ my: 3 }}>
      <ol>
        <Stack spacing={1.5}>
          <li>Tap "Settings" on the bottom navigation bar</li>
          <Image src={TelegramUsernameIOSStep1} sx={imageStyle} />
          <li>Tap "Edit"</li>
          <Image src={TelegramUsernameIOSStep2} sx={imageStyle} />
          <li>Tap "Username"</li>
          <Image src={TelegramUsernameIOSStep3} sx={imageStyle} />
          <li>Set a username and click "Done".</li>
        </Stack>
      </ol>
    </Container>
  );
}
