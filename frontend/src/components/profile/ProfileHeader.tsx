import { Skeleton, Stack, Typography } from '@mui/material';
import { User } from 'src/@types/user';
import { PronounName } from 'src/@types/pronoun';
import NameAvatar from '../NameAvatar';

type ProfileHeaderProps = {
  user: User;
  loading?: boolean;
};

export default function ProfileHeader({ user, loading = false }: ProfileHeaderProps) {
  return (
    <Stack direction="row" alignItems="center">
      {loading ? (
        <Skeleton variant='circular' sx={{ width: 60, height: 60 }} />
      ) : (
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
      )}
      <Stack direction="column">
        {loading ? (
          <Skeleton width={150} sx={{ ml: 3 }} />
        ) : (
          <>
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
          </>
        )}
      </Stack>
    </Stack>
  );
}
