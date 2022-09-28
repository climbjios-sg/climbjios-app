// @mui
import { Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
import { User } from '../../../../@types/user';
import { IconStyle } from './common';

// ----------------------------------------------------------------------

type Props = {
  profile: User;
  action?: React.ReactElement;
};

export default function ProfileAbout({ profile, action }: Props) {
  const { phoneNumber, email, role, company } = profile;

  return (
    <>
      <Card>
        <CardHeader title="About" action={action} />
        <Stack spacing={2} sx={{ p: 3 }}>
          {phoneNumber && (
            <Stack direction="row">
            <IconStyle icon={'eva:phone-fill'} />
              <Typography variant="body2">{phoneNumber}</Typography>
            </Stack>
          )}

          {email && (
            <Stack direction="row">
              <IconStyle icon={'eva:email-fill'} />
              <Typography variant="body2">{email}</Typography>
            </Stack>
          )}

          {(role || company) && (
            <Stack direction="row">
              <IconStyle icon={'ic:round-business-center'} />
              <Typography variant="body2">
                {(role && company) && <>{role} at <strong>{company}</strong></>}
                {!company && role}
                {!role && company}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Card>
    </>
  );
}
