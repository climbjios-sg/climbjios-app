import {
  Grid,
  Box,
  Stack,
  CircularProgress,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
  Button,
} from '@mui/material';

import EmptyContent from 'src/components/EmptyContent';

export const ErrorComponent = () => (
  <Grid sx={{ width: '100%', mt: 2 }} item>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <EmptyContent sx={{ py: 3 }} title="We have an error! That's embarassing 😢" />
      <Button variant="contained">Contact Support</Button>
    </div>
  </Grid>
);

export const LoadingComponent = () => (
  <Card>
    <CardHeader avatar={<Skeleton />} title={<Skeleton />} />
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
    </Stack>
  </Card>
);
export const NoContentComponent = () => (
  <Grid sx={{ width: '100%', mt: 2 }} item>
    <EmptyContent
      sx={{ py: 3, pb: 0 }}
      title={'Nothing found!'}
      description={'Try creating your own?'}
    />
  </Grid>
);

export const ListItemComponent = ({ }) => (
  <Card>
    <CardHeader title={<Typography variant="h5">Default placeholder title</Typography>} />
    <CardContent sx={{ pt: 0 }}>Default placeholder content</CardContent>
  </Card>
);

export const NoMoreComponent = () => (
  <Box sx={{ width: '100%', mt: 4, pb: 8 }}>
    <Divider textAlign="center">That's all!</Divider>
  </Box>
);

export const ScrollForMoreComponent = () => (
  <Box sx={{ width: '100%', mt: 2, pb: 8 }}>
    <Divider textAlign="center">Keep scrolling to load more!</Divider>
  </Box>
);

export const LoadingMoreComponent = () => (
  <Stack direction="column" alignItems="center" sx={{ mt: 2, pb: 8 }}>
    <CircularProgress />
  </Stack>
);
