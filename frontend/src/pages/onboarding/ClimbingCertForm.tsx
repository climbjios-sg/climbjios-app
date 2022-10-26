import { Stack, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { CacheKey, OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';

export const ClimbingCertForm = () => {
  const { enqueueError } = useCustomSnackbar();
  const { data: sncsCertifications } = useSafeRequest(getSncsCertificationList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.SncsCertifications,
    onError: () => {
      enqueueError('Failed to get sncsCertifications.');
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
