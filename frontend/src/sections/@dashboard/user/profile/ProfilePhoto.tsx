// @mui
import { Avatar, Box, Stack, Typography } from '@mui/material';
// @types
import { User } from '../../../../@types/user';

type Props = {
  profile: User;
};

export default function ProfilePhoto({ profile }: Props) {
  const { name, avatarUrl } = profile;

  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        src={avatarUrl}
        sx={{
          mx: 'auto',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'common.white',
          width: { xs: 80, md: 128 },
          height: { xs: 80, md: 128 },
        }}
      />
      <Box
        sx={{
          mt: { xs: 1, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h5">{name}</Typography>
      </Box>
    </Stack>
  );
}
