import { Stack, Typography } from '@mui/material';
import { PronounName, User } from 'src/@types/user';
import NameAvatar from '../NameAvatar';

type ProfileHeaderProps = {
  user: User;
};

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Stack direction="row" alignItems="center">
      <NameAvatar
        name={user.telegramHandle}
        src={user.profilePictureUrl || undefined}
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
          {user.pronoun && user.pronoun.name !== PronounName.PreferNotToSay && (
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
