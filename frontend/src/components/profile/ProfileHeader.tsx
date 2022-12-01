import { Button, Link, Skeleton, Stack, Typography } from '@mui/material';
import { User } from 'src/@types/user';
import { PronounName } from 'src/@types/pronoun';
import NameAvatar from '../NameAvatar';
import Iconify from '../Iconify';
import useGetIdentity from 'src/hooks/auth/useGetIdentity';

type ProfileHeaderProps = {
  user: User;
  loading?: boolean;
};

export default function ProfileHeader({ user, loading = false }: ProfileHeaderProps) {
  const { identity: loggedInUser } = useGetIdentity();
  const isLookingAtOwnProfile = user.userId === loggedInUser.userId
  return (
    <Stack direction="row" alignItems={{ xs: isLookingAtOwnProfile ? "center" : "flex-start", sm: "center" }}>
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
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: isLookingAtOwnProfile ? "center" : "flex-start", sm: "center" }} flexWrap="wrap" width={isLookingAtOwnProfile ? "auto" : "100%"}>
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
        {!isLookingAtOwnProfile && <Link href={`https://t.me/${user.telegramHandle}`} underline="none" target="_blank" rel="noopener noreferrer">
          <Button variant="outlined" style={{ margin: '5px 0' }}>
            <Iconify icon={'jam:telegram'} color={'#2aabee'} />
          </Button>
        </Link>}
      </Stack>
    </Stack>
  );
}
