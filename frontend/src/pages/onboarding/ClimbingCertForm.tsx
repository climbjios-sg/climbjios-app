import { Stack, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import useGetSncsCertificationList from 'src/hooks/services/options/useGetSncsCertificationList';

export const ClimbingCertForm = () => {
  const { data: sncsCertifications } = useGetSncsCertificationList();

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" gutterBottom>
        SNCS Certification (Optional)
      </Typography>
      <RHFSelect name="sncsCertificationId" shouldSanitizeEmptyValue>
        <option value={''} />
        {sncsCertifications.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </RHFSelect>
    </Stack>
  );
};
