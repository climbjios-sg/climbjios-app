import { Gym, GymGrade } from '../../@types/gym';
import { getGymGrades } from '../../services/gyms';
import useErrorSnackbar from '../useErrorSnackbar';
import useSafeRequest from './useSafeRequest';

export default function useGetGymGrades(gymId: Gym['id']): GymGrade[] {
  const errorSnackbar = useErrorSnackbar();
  const { data } = useSafeRequest(() => getGymGrades(gymId.toString()), {
    ready: Boolean(gymId),
    refreshDeps: [gymId],
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Gym Grades.');
    },
  });
  return data?.data || [];
}
