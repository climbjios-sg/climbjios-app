// @muis
import { Link, Card, CardHeader, Stack, Typography } from '@mui/material'; // @types
// @types
import { User } from '../../../../@types/user';
// components
import { IconStyle } from './common';

// ----------------------------------------------------------------------

type Props = {
  profile: User;
  disableLinks?: boolean;
};

export default function ProfileSocialInfo({ profile, disableLinks = false }: Props) {
  const { telegram } = profile;

  const SOCIALS = [
    {
      name: 'Telegram',
      icon: <IconStyle icon={'logos:telegram'} />,
      href: telegram ? 'https://t.me/' + telegram : '',
    },
  ];

  const activeSocials = SOCIALS.filter((link) => link.href);

  if (activeSocials.length === 0) {
    return <></>;
  }

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {activeSocials
          .filter((link) => link.href)
          .map((link) => (
            <Stack key={link.name} direction="row" alignItems="center">
              {link.icon}
              {disableLinks ? (
                <Typography variant="body2">{link.href}</Typography>
              ) : (
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  component="a"
                  variant="body2"
                  color="text.primary"
                  noWrap
                >
                  {link.href}
                </Link>
              )}
            </Stack>
          ))}
      </Stack>
    </Card>
  );
}
