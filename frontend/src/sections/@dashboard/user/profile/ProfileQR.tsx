// @mui
import { Card, Typography, Stack, Avatar, Box } from '@mui/material';
// @types
import { User } from '../../../../@types/user';
// components
import { QRCodeSVG } from 'qrcode.react';
import CopyClipboard from '../../../../components/CopyClipboard';
import { encodeQueryString } from '../../../../utils/queryString';

type Props = {
  profile: User;
};

export default function ProfileHeader({ profile }: Props) {
  const { name, username } = profile;
  const urlStr = `${window.location.origin}/profile${encodeQueryString(profile)}`;

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Stack direction="column" alignItems="center" sx={{ width: '100%' }}>
        <Typography sx={{ mt: 1 }} variant="h5">
          {name}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="h5">
          {`@${username}`}
        </Typography>
        <Box sx={{ my: 1 }}>
          <CopyClipboard value={urlStr} label="Copy profile link" />
        </Box>
        <Box>
          <Typography variant="body2" textAlign="center" color="gray">
            Your QR business card. Share it with your friends for them to add you as a contact.
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
