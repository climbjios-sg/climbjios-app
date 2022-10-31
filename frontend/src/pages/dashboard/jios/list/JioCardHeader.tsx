import { CardHeader, Stack, Typography } from '@mui/material';
import { IconStyle } from 'src/utils/common';
import { Jio } from 'src/@types/jio';
import { getPassesText } from './utils';
import { Link } from 'react-router-dom';
import { makeUserProfileLinkProps } from '../../../publicProfile';
import NameAvatar from '../../../../components/NameAvatar';

interface JioCardHeaderProps {
  data: Jio;
  isHideUsername?: boolean;
}

export default function JioCardHeader({ data, isHideUsername = false }: JioCardHeaderProps) {
  return (
    <CardHeader
      avatar={
        <Stack
          component={Link}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
          }}
          spacing={1}
          direction="row"
          alignItems="center"
          {...makeUserProfileLinkProps({ user: data.creatorProfile })}
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
          {!isHideUsername && (
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
