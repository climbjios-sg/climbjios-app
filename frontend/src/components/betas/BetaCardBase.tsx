import React from 'react';
// @mui
import { Box, Card, Typography, Stack, Divider } from '@mui/material';
// components
import { Beta } from '../../@types/beta';
import Video from '../Video';
import { Link } from 'react-router-dom';
import { makeUserProfileLinkProps } from '../../pages/publicProfile';
import NameAvatar from '../NameAvatar';
import WallIcon from './WallIcon';
import { format } from 'date-fns';

// ----------------------------------------------------------------------

type Props = {
  data: Beta;
  bottom?: React.ReactNode;
};

// Memoizing content since it will be rendered in a infinite list
const BetaCaseBase = React.memo(({ data, bottom }: Props) => (
  <Card className='beta-card' sx={{ background: 'black', height: '100%' }}>
    <Stack direction="column">
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Stack
          component={Link}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            zIndex: 1001,
            position: 'absolute',
            backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5))',
            left: 0,
            paddingLeft: '8px',
            top: 0,
            paddingTop: '6px',
            width: '100%',
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
            src={data.creatorProfile.profilePictureUrl || undefined}
          />
          <Stack direction="column" spacing={-0.15}>
            <Typography
              color="white"
              variant="subtitle2"
            >{`@${data.creatorProfile.telegramHandle}`}</Typography>
            <Typography color="white" variant="caption">{format(new Date(data.createdAt), 'd MMM')}</Typography>
          </Stack>
        </Stack>
        <Video
          cloudflareVideoUid={data.cloudflareVideoUid}
          thumbnailSrc={data.thumbnailUrl}
          videoUrl={data.videoUrl}
        />
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
          <WallIcon color={data.color.name} wall={data.wall.name} />
        </Stack>
      </Box>
      {bottom}
    </Stack>
  </Card>
));

export default BetaCaseBase;
