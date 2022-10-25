import { Stack, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';
import { CacheKey, OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';

export const ClimbingCertForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: sncsCertifications } = useSafeRequest(getSncsCertificationList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.SncsCertifications,
    onError: () => {
      enqueueSnackbar('Failed to get sncsCertifications.', { variant: 'error' });
    },
  });

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" gutterBottom>
        SNCS Certification (Optional)
      </Typography>
      <RHFSelect name="sncsCertificationId" shouldSanitizeEmptyValue>
        <option value={''} />
        {sncsCertifications?.data.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </RHFSelect>
    </Stack>
  );
};
