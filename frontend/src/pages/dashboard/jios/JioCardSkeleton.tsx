import { Card, CardHeader, Stack, Skeleton, Typography } from '@mui/material';

export default function JioCardSkeleton() {
  return (
    <Card>
      <CardHeader title={<Skeleton />} subheader={<Skeleton />} />
      <Stack spacing={1.5} sx={{ px: 3, pb: 3, pt: 2 }}>
        <Stack direction="row">
          <Skeleton width="100%" />
        </Stack>
        <Stack direction="row">
          <Skeleton width="100%" />
        </Stack>
        <Stack direction="row">
          <Skeleton width="100%" />
        </Stack>
        <Stack direction="row">
          <Skeleton width="100%" />
        </Stack>
        <Stack direction="row">
          <Skeleton width="100%" />
        </Stack>
        <Stack direction="row">
          <Skeleton width="100%" />
        </Stack>
      </Stack>
    </Card>
  );
}
