import * as React from 'react';
import Iconify from 'src/components/Iconify';
import useRefresh from 'src/hooks/useRefresh';
import { useNavigate, useParams } from 'react-router-dom';
import JiosForm, { JioFormValues } from '../form/JiosForm';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { getJio, updateJio } from 'src/services/jios';
import { Jio } from 'src/@types/jio';
import { dateToTimeString } from '../../../../utils/formatTime';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { jioFormValuesToRequestJio } from '../form/utils';

const jioToJioFormValues = (jio: Jio): JioFormValues => ({
  type: jio.type,
  numPasses: jio.numPasses,
  price: jio.price,
  gymId: jio.gym.id,
  openToClimbTogether: jio.openToClimbTogether,
  optionalNote: jio.optionalNote,
  date: new Date(jio.startDateTime),
  // Time in 09:00 format
  startTiming: dateToTimeString(new Date(jio.startDateTime)),
  // Time in 09:00 format
  endTiming: dateToTimeString(new Date(jio.endDateTime)),
});

export default function JiosEdit() {
  const { id } = useParams();
  const jioId = Number(id);
  const { enqueueSnackbar } = useSnackbar();
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
      navigate(PATH_DASHBOARD.general.jios.root);
    },
    onError: () => {
      enqueueSnackbar('Failed to update', { variant: 'error' });
    },
  });

  const handleEdit = async (data: JioFormValues) => {
    if (isNaN(jioId)) {
      return;
    }

    submitUpdateJio(jioFormValuesToRequestJio(data), jioId);
  };

  return !data || error || loading ? null : (
    <JiosForm
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
      defaultValues={jioToJioFormValues(data.data)}
    />
  );
}
