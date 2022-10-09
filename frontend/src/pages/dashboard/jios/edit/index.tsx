import * as React from 'react';
import Iconify from 'src/components/Iconify';
import useRefresh from 'src/hooks/useRefresh';
import { useNavigate, useParams } from 'react-router-dom';
import JiosForm, { JioFormValues } from '../JiosForm';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { getJio, updateJio } from 'src/services/jios';
import { Jio } from 'src/@types/jio';

const getJioFormValues = (jio: Jio): JioFormValues => ({
  type: jio.type,
  numPasses: jio.numPasses,
  price: jio.price,
  gymId: jio.gym.id,
  openToClimbTogether: jio.openToClimbTogether,
  optionalNote: jio.optionalNote,
  // FIXME: extract date and time from datetime
  date: new Date(),
  // Time in 09:00 format
  startTiming: '',
  // Time in 09:00 format
  endTiming: '',
});

export default function JiosEdit() {
  const { id } = useParams();
  const jioId = Number(id);
  const { enqueueSnackbar } = useSnackbar();
  const refresh = useRefresh();
  const navigate = useNavigate();

  const { data, error, loading } = useRequest(getJio, {
    onError: () => {
      enqueueSnackbar('Failed to get jio', { variant: 'error' });
    },
  });
  const { run: submitUpdateJio } = useRequest(updateJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Updated!');
      refresh();
      navigate('');
    },
    onError: () => {
      enqueueSnackbar('Failed to update', { variant: 'error' });
    },
  });

  const handleEdit = async (data: JioFormValues) => {
    if (isNaN(jioId)) {
      return;
    }

    submitUpdateJio(data, jioId);
  };

  return !data || error || loading ? null : (
    <JiosForm
      // TODO: get form instance from posts/id
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
      defaultValues={getJioFormValues(data.data)}
    />
  );
}
