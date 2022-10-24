import { Stack, Avatar, Typography } from '@mui/material';
import { User } from 'src/@types/user';

type ProfileHeaderProps = {
  user: User;
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Stack direction="row" alignItems="center">
      <Avatar
        alt={user.telegramHandle}
        src={user.profilePictureUrl}
        sx={{
          width: 60,
          height: 60,
          zIndex: 11,
          mr: 2,
          ml: 1,
        }}
      />
      <Stack direction="column">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle1">{user.name}</Typography>
          {user.pronoun && (
            <Typography
              sx={{ color: 'text.secondary' }}
              variant="body2"
            >{`(${user.pronoun.name})`}</Typography>
          )}
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`@${user.telegramHandle}`}
        </Typography>
      </Stack>
    </Stack>
  );
}
