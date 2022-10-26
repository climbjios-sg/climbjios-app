import { Gym, GymGrade } from '../../@types/gym';
import { getGymGrades } from '../../services/gyms';
import useCustomSnackbar from '../useCustomSnackbar';
import useSafeRequest from './useSafeRequest';

export default function useGetGymGrades(gymId: Gym['id']): GymGrade[] {
  const errorSnackbar = useCustomSnackbar();
  const { data } = useSafeRequest(() => getGymGrades(gymId.toString()), {
    ready: Boolean(gymId),
    refreshDeps: [gymId],
    onError: () => {
      errorSnackbar.enqueueError('Failed to get Gym Grades.');
    },
  });
  return data?.data || [];
}
