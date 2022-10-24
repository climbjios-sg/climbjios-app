import Iconify from 'src/components/Iconify';
import { useNavigate, useParams } from 'react-router-dom';
import JiosCreateEditForm from '../forms/JiosCreateEditForm';
import { JioCreateEditFormValues, jioFormValuesToJioRequest } from '../forms/utils';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';
import { getJio, updateJio } from 'src/services/jios';
import { Jio } from 'src/@types/jio';
import { dateToTimeString } from '../../../../utils/formatTime';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useErrorSnackbar from '../../../../hooks/useErrorSnackbar';

const jioToJioFormValues = (jio: Jio): JioCreateEditFormValues => ({
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
  const errorSnackbar = useErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data } = useSafeRequest(() => getJio(jioId), {
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to retrieve your Jio.');
    },
  });

  const navigateOut = () => {
    navigate(PATH_DASHBOARD.general.jios.userJios);
  };

  const { run: submitUpdateJio } = useSafeRequest(updateJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Updated your Jio.');
      navigateOut();
    },
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to update your Jio.');
    },
  });

  const handleEdit = async (data: JioCreateEditFormValues) => {
    if (isNaN(jioId)) {
      return;
    }

    submitUpdateJio(jioFormValuesToJioRequest(data), jioId);
  };

  // TODO: handle error and loading
  return !data ? null : (
    <JiosCreateEditForm
      title="Edit Jio"
      onCancel={navigateOut}
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
      defaultValues={jioToJioFormValues(data.data)}
    />
  );
}
