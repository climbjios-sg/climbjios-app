import React from 'react';
// @mui
import { Box, Card, Typography, Stack, Divider } from '@mui/material';
// components
import { Beta } from '../../@types/beta';
import Video from '../Video';
import { Link } from 'react-router-dom';
import { makeUserProfileLinkProps } from '../../pages/publicProfile';
import NameAvatar from '../NameAvatar';

// ----------------------------------------------------------------------

type Props = {
  data: Beta;
  bottom?: React.ReactNode;
};

// Memoizing content since it will be rendered in a infinite list
const BetaCaseBase = React.memo(({ data, bottom }: Props) => (
  <Card sx={{ background: 'black', height: '100%' }}>
    <Stack direction="column">
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Stack
          component={Link}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            left: 8,
            zIndex: 1001,
            top: 6,
            position: 'absolute',
          }}
          direction="row"
          alignItems="center"
          {...makeUserProfileLinkProps({ user: data.creatorProfile })}
        >
          <NameAvatar
            sx={{
              width: 32,
              height: 32,
              mr: 1,
            }}
            name={data.creatorProfile.telegramHandle}
            src={data.creatorProfile.profilePictureUrl}
          />
          <Typography
            color="white"
            variant="subtitle2"
          >{`@${data.creatorProfile.telegramHandle}`}</Typography>
        </Stack>
        <Video videoSrc={data.cloudflareVideoUid} thumbnailSrc={data.thumbnailUrl} />
        <Stack
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            color: 'white',
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5))',
            paddingBottom: 2,
            paddingTop: 1,
            paddingLeft: 2,
            width: '100%',
          }}
          direction="row"
          spacing={1}
          divider={<Divider color="white" orientation="vertical" flexItem />}
        >
          {[data.gym.shortName, data.gymGrade.name].map((text) => (
            <Typography variant="caption" key={text}>
              {text}
            </Typography>
          ))}
        </Stack>
      </Box>
      {bottom}
    </Stack>
  </Card>
));

export default BetaCaseBase;
