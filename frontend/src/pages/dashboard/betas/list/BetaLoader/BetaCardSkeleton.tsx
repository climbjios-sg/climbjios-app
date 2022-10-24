import { Card, Skeleton, Stack } from '@mui/material';

export default function BetaCardSkeleton() {
  return (
    <Card>
      <Stack spacing={2}>
        <Skeleton
          sx={{
            ml: 1,
            mt: 1,
          }}
          variant="circular"
          width={40}
          height={40}
        />
        <Skeleton variant="rectangular" height={300} width="100%" />
      </Stack>
    </Card>
  );
}
