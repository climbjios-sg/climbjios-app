// @mui
import { Card, Grid, List, ListItem, Skeleton, Typography } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
// types
import { User } from 'src/@types/user';
//
import {
  formatHeightReach,
  formatHighestBoulderingGrade,
  formatHighestLeadAndTopRopeGrade,
  formatSncsCertification,
} from 'src/utils/formatString';
import { Stack } from '@mui/system';
import { useMemo, useCallback } from 'react';

interface BioProps {
  data: User;
  loading?: boolean;
  action?: React.ReactElement;
}

export default function BioCard({ data, action, loading = false }: BioProps) {
  const isEmpty = useCallback(
    () =>
      !(
        data.bio ||
        data.height ||
        data.reach ||
        (data.sncsCertification && data.sncsCertification.name) ||
        (data.highestBoulderingGrade && data.highestBoulderingGrade.name) ||
        (data.highestLeadClimbingGrade && data.highestLeadClimbingGrade.name) ||
        (data.highestTopRopeGrade && data.highestTopRopeGrade.name) ||
        (data.favouriteGyms && data.favouriteGyms.length > 0)
      ),
    [data]
  );

  const renderedContent = useMemo(() => {
    if (loading) {
      return (
        <Stack direction="column" alignItems="center" spacing={0.8}>
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
          <Skeleton height={30} width="100%" />
        </Stack>
      );
    } else {
      return (
        <>
          <Typography variant="body1" sx={{ my: 2 }}>
            {isEmpty() ? 'No information yet.' : data.bio}
          </Typography>

          <Grid container spacing={2}>
            {(data.height || data.reach) && (
              <>
                <Grid item xs={1}>
                  <Iconify icon="game-icons:body-height" height={15} width={15} color="blue" />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1">
                    {formatHeightReach(data.height || undefined, data.reach || undefined)}
                  </Typography>
                </Grid>
              </>
            )}

            {data.sncsCertification && data.sncsCertification?.name && (
              <>
                <Grid item xs={1}>
                  <Iconify icon="icon-park:certificate" height={15} width={15} />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1">
                    {formatSncsCertification(data.sncsCertification.name)}
                  </Typography>
                </Grid>
              </>
            )}

            {data.highestBoulderingGrade && data.highestBoulderingGrade?.name && (
              <>
                <Grid item xs={1}>
                  <Iconify icon="fluent-emoji-flat:rock" height={15} width={15} />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1">
                    {formatHighestBoulderingGrade(data.highestBoulderingGrade.name)}
                  </Typography>
                </Grid>
              </>
            )}

            {(data.highestLeadClimbingGrade || data.highestTopRopeGrade) && (
              <>
                <Grid item xs={1}>
                  <Iconify icon="fluent-emoji:man-climbing-medium-light" height={15} width={15} />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="body1">
                    {formatHighestLeadAndTopRopeGrade(
                      data.highestLeadClimbingGrade?.name,
                      data.highestTopRopeGrade?.name
                    )}
                  </Typography>
                </Grid>
              </>
            )}

            {data.favouriteGyms && data.favouriteGyms.length > 0 && (
              <>
                <Grid item xs={1}>
                  <Iconify icon="bi:house-heart-fill" height={15} width={15} color="#CC6CC2" />
                </Grid>
                <Grid item xs={11}>
                  <List sx={{ p: 0 }}>
                    {data.favouriteGyms.map((gym) => (
                      <ListItem key={gym.id} sx={{ p: 0 }}>
                        <Typography variant="body1">{gym.name}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </>
            )}
          </Grid>
        </>
      );
    }
  }, [data, isEmpty, loading]);

  return (
    <Card sx={{ textAlign: 'left', px: 3, py: 3, width: '100%' }}>
      <Stack sx={{ mb: 2.5 }} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{'Bio'}</Typography>
        {action}
      </Stack>
      {renderedContent}
    </Card>
  );
}
