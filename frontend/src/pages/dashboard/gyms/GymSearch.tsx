import { useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';
import TextInput from 'src/components/inputs/TextInput';

export default function GymSearch() {
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
  });

  return (
    <Stack direction="column" sx={{ pb: 1.5 }} spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ width: '100%', display: trigger ? 'none' : 'flex', pt: 1.5 }}
      >
        <TextInput icon="ic:outline-search" placeholder="Enter a gym name" size="small"/>
      </Stack>
    </Stack>
  );
}
