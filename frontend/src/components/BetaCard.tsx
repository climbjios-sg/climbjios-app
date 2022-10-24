import React from 'react';
// @mui
import { Box, Card, Avatar, Typography, CardContent, Stack, Divider } from '@mui/material';
// components
import { formatDate } from '../utils/formatTime';
import { Beta } from '../@types/beta';
import Video from './Video';
import { Link } from 'react-router-dom';
import { makeUserProfileLinkProps } from '../pages/publicProfile';

// ----------------------------------------------------------------------

type Props = {
  data: Beta;
};

// Memoizing content since it will be rendered in a infinite list
const BetaCard = React.memo(({ data }: Props) => (
  <Card sx={{ background: 'black', height: '100%' }}>
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
        <Avatar
          sx={{
            width: 32,
            height: 32,
            mr: 1,
          }}
          alt={data.creatorProfile.telegramHandle}
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
        {[data.gym.name, data.gymGrade.name].map((text) => (
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
