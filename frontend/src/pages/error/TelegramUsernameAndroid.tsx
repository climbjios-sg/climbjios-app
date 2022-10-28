import { Container, Stack } from '@mui/material';
import Image from 'src/components/Image';
import {
  TelegramUsernameAndroidStep1,
  TelegramUsernameAndroidStep2,
  TelegramUsernameAndroidStep3,
} from 'src/assets/TelegramUsernameInstructions';

const imageStyle = {
  width: '40%',
  minWidth: 200,
};

export default function TelegramUsernameAndroid() {
  return (
    <Container sx={{ my: 3 }}>
      <ol>
        <Stack spacing={1.5}>
          <li>Tap the "Menu" icon on the top left</li>
          <Image src={TelegramUsernameAndroidStep1} sx={imageStyle} />
          <li>Tap "Settings"</li>
          <Image src={TelegramUsernameAndroidStep2} sx={imageStyle} />
          <li>Tap "Username"</li>
          <Image src={TelegramUsernameAndroidStep3} sx={imageStyle} />
          <li>Set a username and save.</li>
        </Stack>
      </ol>
    </Container>
  );
}
