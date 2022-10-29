import { Stack, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useGetOptions from 'src/hooks/services/options/useGetOptions';
import useGetSncsCertficationList from 'src/hooks/services/options/useGetSncsCertficationList';

export const ClimbingCertForm = () => {
  const { data: sncsCertifications } = useGetSncsCertficationList();

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
