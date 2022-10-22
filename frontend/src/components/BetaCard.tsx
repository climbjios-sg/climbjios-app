import React from 'react';
// @mui
import { Box, Card, Avatar, Typography, CardContent, Stack, Divider } from '@mui/material';
// components
import { formatDate } from '../utils/formatTime';
import { Beta } from '../@types/beta';
import Video from './Video';

// ----------------------------------------------------------------------

type Props = {
  beta: Beta;
};

// Memoizing content since it will be rendered in a inifinite list
const BetaCard = React.memo(({ beta }: Props) => (
  <Card sx={{ background: 'black', height: '100%' }}>
    <Box sx={{ position: 'relative', height: '100%' }}>
      {/* TODO: Should link to user public profile on click */}
      <Stack
        sx={{
          left: 8,
          zIndex: 9,
          top: 6,
          position: 'absolute',
        }}
        direction={'row'}
        alignItems="center"
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            mr: 1,
          }}
          alt={beta.creatorProfile.telegramHandle}
          src={beta.creatorProfile.profilePictureUrl}
        />
        <Typography
          color="white"
          variant="subtitle2"
        >{`@${beta.creatorProfile.telegramHandle}`}</Typography>
      </Stack>
      <Video src={beta.cloudflareVideoUid} />
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
        {[beta.gym.name, beta.gymGrade.name].map((text) => (
          <Typography variant="caption" key={text}>
            {text}
          </Typography>
        ))}
      </Stack>
      {/* Like button for next time */}
      {/* <Stack>
          <IconButton size="medium" sx={{ position: 'absolute', bottom: 3, right: 4 }}>
            <Iconify sx={{ color: 'white' }} icon="eva:heart-fill" />
          </IconButton>
        </Stack> */}
    </Box>
  </Card>
));

export default BetaCard;

// ----------------------------------------------------------------------

type PostContentProps = {
  color: string;
  grade: string;
  wall: string;
  gym: string;
  createdAt: Date;
};

export function PostContent({ color, grade, wall, gym, createdAt }: PostContentProps) {
  return (
    <CardContent>
      <Stack
        direction="row"
        spacing={1}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          color: 'text.disabled',
        }}
      >
        {[color, grade, wall].map((text) => (
          <Typography variant="caption" key={text}>
            {text}
          </Typography>
        ))}
      </Stack>
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
        }}
      >
        {formatDate(createdAt)}
      </Typography>
    </CardContent>
  );
}
