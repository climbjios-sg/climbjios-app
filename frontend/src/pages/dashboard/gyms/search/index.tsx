import { useTheme, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { Jio } from 'src/@types/jio';
import useGetGymList from 'src/hooks/services/options/useGetGymList';
import { useDispatch } from 'src/store';
import { setJiosSearchForm } from 'src/store/reducers/jiosSearchForm';
import { Gym } from 'src/@types/gym';
import Iconify from 'src/components/Iconify';
import TextInput from 'src/components/inputs/TextInput';

export default function JioSearch() {
  const gyms = useGetGymList();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [gym, setGym] = useState<Gym['id'] | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(null);
  const [jioType, setJioType] = useState<string | null>(null);
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
  });

  // Update jio search form
  useEffect(() => {
    dispatch(
      setJiosSearchForm({
        gymId: gym ? gym : undefined,
        date: date ? date : undefined,
        type: jioType ? (jioType as Jio['type']) : undefined,
      })
    );
  }, [date, dispatch, gym, jioType]);

  return (
    <Stack direction="column" sx={{ pb: 1.5 }} spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ width: '100%', display: trigger ? 'none' : 'flex', pt: 2 }}
      >
        <TextInput icon='ic:outline-search' />
      </Stack>
    </Stack>
  );
}
