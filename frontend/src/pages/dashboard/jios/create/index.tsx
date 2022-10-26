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

export default function JiosCreate() {
  const { enqueueSnackbar, enqueueError } = useCustomSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Auto-populate default create values from search JioSearchForm
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);

  const navigateOut = () => {
    navigate(PATH_DASHBOARD.general.jios.userJios);
  };

  const { run: submitCreateJio } = useSafeRequest(createJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar(
        'Created your ClimbJio! Now wait for other climbers to message you on Telegram.',
        {
          autoHideDuration: 5000,
        }
      );
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
      defaultValues={jioSearchValues || undefined}
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
