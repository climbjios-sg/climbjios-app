import { Stack, FormHelperText, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { getBoulderingGradeList } from 'src/services/boulderingGrades';
import { getTopRopeGradeList } from 'src/services/topRopeGrades';
import { getLeadClimbingGradeList } from 'src/services/leadClimbingGrades';
import { OnboardingFormValues } from './types';
import useGetOptions from 'src/hooks/services/useGetOptions';

export const ClimbingGradesForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;

  const { data: boulderingGrades } = useGetOptions(getBoulderingGradeList);
  const { data: topRopeGrades } = useGetOptions(getTopRopeGradeList);
  const { data: leadClimbingGrades } = useGetOptions(getLeadClimbingGradeList);

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="subtitle1" gutterBottom>
          Highest bouldering grade (Optional)
        </Typography>
        <RHFSelect name="highestBoulderingGradeId" shouldSanitizeEmptyValue>
          <option value={''} />
          {boulderingGrades.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </RHFSelect>
      </Stack>
      <Stack>
        <Typography variant="subtitle1" gutterBottom>
          Highest top rope grade (Optional)
        </Typography>
        <FormHelperText error>{errors?.highestTopRopeGradeId?.message}</FormHelperText>
        <RHFSelect name="highestTopRopeGradeId" shouldSanitizeEmptyValue>
          <option value={''} />
          {topRopeGrades.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </RHFSelect>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="subtitle1" gutterBottom>
          Highest lead grade (Optional)
        </Typography>
        <RHFSelect name="highestLeadClimbingGradeId" shouldSanitizeEmptyValue>
          <option value={''} />
          {leadClimbingGrades.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </Stack>
  );
};
