import { Stack } from '@mui/system';
import DelayedSearch from 'src/components/inputs/DelayedSearch';

export default function GymSearch({
  initialValue,
  setSearchString,
}: {
  initialValue?: string;
  setSearchString: any;
}) {
  return (
    <Stack direction="column" sx={{ pb: 1.5 }} spacing={1.5}>
      <Stack direction="row" alignItems="center" sx={{ width: '100%', pt: 1.5 }}>
        <DelayedSearch
          initialValue={initialValue}
          setSearchString={setSearchString}
          placeholder="Enter a gym name"
          size="small"
        />
      </Stack>
    </Stack>
  );
}
