import { Card, Stack, Skeleton } from '@mui/material';

export default function GymPageLoader() {
  return (
    <Stack padding={2} spacing={2}>
      <Card sx={{ height: 230 }}>
        <Stack
          padding={1.5}
          sx={{ pb: 0 }}
          justifyContent="flex-end"
          alignItems="flex-start"
          height="100%"
        >
          <Skeleton variant="circular" width={60} height={60} />
          <Stack spacing={-1} width="100%">
            <Skeleton width="60%" sx={{ fontSize: '2rem' }} />
            <Skeleton width="40%" sx={{ fontSize: '2rem' }} />
          </Stack>
          <Stack direction="row" width="100%" justifyContent="space-between">
            <Skeleton variant="rectangular" width="30%" height={35} />
            <Skeleton variant="rectangular" width="30%" height={35} />
            <Skeleton variant="rectangular" width="30%" height={35} />
          </Stack>
        </Stack>
      </Card>
      <Card>
        <Stack spacing={0} padding={1}>
          <Skeleton width="100%" sx={{ fontSize: '0.5rem' }} />
          <Skeleton width="100%" sx={{ fontSize: '0.5rem' }} />
          <Skeleton width="100%" sx={{ fontSize: '0.5rem' }} />
        </Stack>
      </Card>
      <Card>
        <Stack spacing={0.3} sx={{ px: 3, pb: 1, pt: 1 }}>
          <Skeleton width="25%" sx={{ fontSize: '1.2rem', pb: 2 }} />
          <Skeleton width="100%" />
          <Skeleton width="60%" />
          <Skeleton width="40%" />
          <Skeleton width="30%" />
          <Skeleton width="100%" />
          <Skeleton width="40%" />
          <Skeleton width="30%" />
          <Skeleton width="80%" />
          <Skeleton width="100%" />
          <Skeleton width="20%" />
        </Stack>
      </Card>
    </Stack>
  );
}
