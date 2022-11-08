import Iconify from 'src/components/Iconify';
import { useNavigate, useParams } from 'react-router-dom';
import JiosCreateEditForm from '../forms/JiosCreateEditForm';
import { JioCreateEditFormValues, jioFormValuesToJioRequest } from '../forms/utils';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';
import { getJio, updateJio } from 'src/services/jios';
import { Jio } from 'src/@types/jio';
import { dateToTimeString, isJioAutofilledDateTime } from 'src/utils/formatTime';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { useRequest } from 'ahooks';
import Page404 from '../../../error/Page404';

const jioToJioFormValues = (jio: Jio, disableDateTime: boolean): JioCreateEditFormValues => {
  const retObj: JioCreateEditFormValues = {
    type: jio.type,
    numPasses: jio.numPasses,
    price: jio.price,
    gymId: jio.gym.id,
    openToClimbTogether: jio.openToClimbTogether,
    optionalNote: jio.optionalNote,
    date: null,
  };

  if (!disableDateTime) {
    retObj.date = new Date(jio.startDateTime);
    // Time in 09:00 format
    retObj.startTiming = dateToTimeString(new Date(jio.startDateTime));
    // Time in 09:00 format
    retObj.endTiming = dateToTimeString(new Date(jio.endDateTime));
  }

  return retObj;
};

export default function JiosEdit() {
  const { id } = useParams();
  const jioId = String(id);
  const snackbar = useCustomSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data, loading } = useRequest(() => getJio(jioId), {
    onError: () => {
      snackbar.enqueueError('Failed to retrieve your Jio.');
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
      snackbar.enqueueError('Failed to update your Jio.');
    },
  });

  const handleEdit = async (data: JioCreateEditFormValues) => {
    submitUpdateJio(jioFormValuesToJioRequest(data), jioId);
  };

  if (loading) {
    return <></>;
  }

  if (!data) {
    return <Page404 />;
  }

  // Disable date time field if difference in days is > 0
  // Means user didn't fill up the datetime and it's auto set by backend
  const disableDateTime = isJioAutofilledDateTime({
    startDateTime: new Date(data.data.startDateTime),
    endDateTime: new Date(data.data.endDateTime),
  });
  return (
    <JiosCreateEditForm
      title="Edit Jio"
      onCancel={navigateOut}
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
      defaultValues={jioToJioFormValues(data.data, disableDateTime)}
      disableDateTime={disableDateTime}
    />
  );
}
