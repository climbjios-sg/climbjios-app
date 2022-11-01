import { CardHeader, Stack, Typography } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { Jio } from 'src/@types/jio';
import { getPassesText } from '../../pages/dashboard/jios/list/utils';
import { Link } from 'react-router-dom';
import { makeUserProfileLinkProps } from '../../pages/publicProfile';
import NameAvatar from '../NameAvatar';

interface JioCardHeaderProps {
  data: Jio;
  isUsernameHidden?: boolean;
  isLinkDisabled?: boolean;
}

export default function JioCardHeader({
  data,
  isUsernameHidden = false,
  isLinkDisabled = false,
}: JioCardHeaderProps) {
  const linkProps = isLinkDisabled
    ? {}
    : {
        component: Link,
        ...makeUserProfileLinkProps({ user: data.creatorProfile }),
      };

  return (
    <CardHeader
      avatar={
        <Stack
          sx={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          spacing={1}
          direction="row"
          alignItems="center"
          {...linkProps}
        >
          <NameAvatar
            name={data.creatorProfile.telegramHandle}
            src={data.creatorProfile.profilePictureUrl || undefined}
            sx={{
              width: 40,
              height: 40,
              zIndex: 11,
              mx: 'auto',
            }}
          />
          {!isUsernameHidden && (
            <Typography variant="h6">{`@${data.creatorProfile.telegramHandle}`}</Typography>
          )}
        </Stack>
      }
      action={
        <Stack sx={{ pt: 1.5 }} spacing={1} direction="row" alignItems="center">
          <Typography>{getPassesText(data)}</Typography>
          <IconStyle icon={'mingcute:coupon-fill'} color="#b281e3" />
        </Stack>
      }
    />
  );
}
