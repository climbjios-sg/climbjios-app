import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import JiosCreateEditForm from '../forms/JiosCreateEditForm';
import { JioCreateEditFormValues, jioFormValuesToJioRequest } from '../forms/utils';
import { createJio } from 'src/services/jios';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../store';
import { clearJiosSearchForm } from '../../../../store/reducers/jiosSearchForm';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import useCustomSnackbar from '../../../../hooks/useCustomSnackbar';
import { isJioAutofilledDateTime } from 'src/utils/formatTime';
import mixpanel_actions from 'src/mixpanel';
import { SUCCESSFUL_JIO } from 'src/mixpanel/labels';

function invertJioTypeValues(
  values: Partial<
    Pick<JioCreateEditFormValues, 'gymId' | 'date' | 'startTiming' | 'endTiming' | 'type'>
  > | null
) {
  const newValues = { ...values };
  if (newValues?.type === 'buyer') {
    newValues.type = 'seller';
  } else if (newValues?.type === 'seller') {
    newValues.type = 'buyer';
  }
  return newValues;
}

export default function JiosCreate() {
  const { enqueueSnackbar, enqueueError } = useCustomSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Auto-populate default create values from search JioSearchForm
  const jioCreateDefaultValues = invertJioTypeValues(
    useSelector((state) => state.jioSearchForm.data)
  );

  const navigateOut = () => {
    navigate(PATH_DASHBOARD.general.jios.userJios);
  };

  const { run: submitCreateJio } = useSafeRequest(createJio, {
    manual: true,
    onSuccess: (data) => {
      mixpanel_actions.track(SUCCESSFUL_JIO);
      let snackbarText = '';
      if (
        isJioAutofilledDateTime({
          startDateTime: new Date(data.data.startDateTime),
          endDateTime: new Date(data.data.endDateTime),
        })
      ) {
        snackbarText =
          "Created your ClimbJio! We've set the date of the Jio as anytime from now till 2 months later, since you didn't specify one.";
      } else {
        snackbarText =
          'Created your ClimbJio! Now wait for other climbers to message you on Telegram.';
      }
      enqueueSnackbar(snackbarText, {
        autoHideDuration: 10000,
      });
      dispatch(clearJiosSearchForm());
      navigateOut();
    },
    onError: (error) => {
      enqueueError('Failed to create Jio.');
    },
  });

  const handleCreate = async (data: JioCreateEditFormValues) => {
    submitCreateJio(jioFormValuesToJioRequest(data));
  };

  return (
    <JiosCreateEditForm
      title="Create A Jio"
      onCancel={navigateOut}
      defaultValues={jioCreateDefaultValues || undefined}
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
