import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import JiosCreateEditForm from '../form/JiosCreateEditForm';
import { JioCreateEditFormValues, jioFormValuesToJioRequest } from '../form/utils';
import { useSnackbar } from 'notistack';
import { createJio } from 'src/services/jios';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../store';
import { clearJiosSearchForm } from '../../../../store/reducers/jiosSearchForm';
import useSafeRequest from 'src/hooks/useSafeRequest';

export default function JiosCreate() {
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar('Failed to create', { variant: 'error' });
    },
  });

  const handleCreate = async (data: JioCreateEditFormValues) => {
    submitCreateJio(jioFormValuesToJioRequest(data));
  };

  return (
    <JiosCreateEditForm
      onCancel={navigateOut}
      defaultValues={jioSearchValues || undefined}
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
