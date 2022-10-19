// @mui
import { Box, Card, Avatar, Typography, CardContent, Stack, Divider } from '@mui/material';
// components
import Image from './Image';
import SvgIconStyle from './SvgIconStyle';
import { User } from '../@types/user';
import { formatDate } from '../utils/formatTime';
import { BetaDemo } from '../@types/beta';

// ----------------------------------------------------------------------

type Props = {
  author: User;
  beta: BetaDemo;
  //   video:
};

export default function BetaCard({ author, beta }: Props) {
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={author.username}
          src={`https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_1.jpg`}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={beta.imageUrl} ratio={'9/16'} />
      </Box>

      <PostContent
        color={beta.color}
        grade={beta.grade}
        wall={beta.wall}
        gym={beta.gym}
        createdAt={beta.createdAt}
      />
    </Card>
  );
}

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
