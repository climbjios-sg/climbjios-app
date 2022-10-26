import ProfileHeaderAndTabs from 'src/components/profile/ProfileHeaderAndTabs';
import useGetIdentity from 'src/hooks/auth/useGetIdentity';
import ProfileBetas from '../../../../components/profile/ProfileBetas';
import AboutTab from './AboutTab';

export default function MyProfile() {
  const { identity: user } = useGetIdentity();

  if (!user) {
    return <></>;
  }

  return (
    <ProfileHeaderAndTabs
      sx={{ px: 0, maxWidth: 600, margin: '0 auto', pb: 20 }}
      user={user}
      aboutTab={<AboutTab user={user} />}
      betasTab={<ProfileBetas isMine creatorId={user.userId} />}
    />
  );
}
