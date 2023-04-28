// @mui
import { Stack, Card } from '@mui/material';
import { getGymPasses } from 'src/services/gyms';
import { GymPasses } from 'src/@types/gymPasses';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import PassesCard from './PassesCard';
import { useRequest } from 'ahooks';

export default function GymPassesTab({ gymId }: { gymId: number }) {
  const errorSnackbar = useCustomSnackbar();

  const { data, loading } = useRequest<GymPasses, any>(
    async () => (await getGymPasses(gymId)).data,
    {
      onError: () => errorSnackbar.enqueueError('Failed to load data.'),
    }
  );

  if (loading || !data) {
    return JioCardLoader();
  }

  const { gymOutletPasses, gymGroupPasses } = data!;

  if (gymOutletPasses.length === 0 && gymGroupPasses.length === 0) {
    return <Card sx={{ padding: 2, pl: 3 }}>We've got no data for this gym yet!</Card>;
  }

  return (
    <div>
      {gymGroupPasses.length > 0 ? (
        <Stack padding={2} spacing={2}>
          {gymOutletPasses.length > 0 && (
            <PassesCard title="Outlet Passes" data={gymOutletPasses} />
          )}
          <PassesCard title="Multi-Gym Passes" data={gymGroupPasses} />
        </Stack>
      ) : (
        <PassesCard title="Gym Passes" data={gymOutletPasses} />
      )}
    </div>
  );
}
