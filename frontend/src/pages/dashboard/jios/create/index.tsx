import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import JiosCreateEditForm from '../form/JiosCreateEditForm';
import { JioCreateEditFormValues , jioFormValuesToRequestJio } from "../form/utils";
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { createJio } from 'src/services/jios';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../store';
import { clearJiosSearchForm } from '../../../../store/reducers/jiosSearchForm';

export default function JiosCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Auto-populate default create values from search JioSearchForm
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);

  const { run: submitCreateJio } = useRequest(createJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Created your ClimbJio! Now wait for other climbers to message you on Telegram.');
      dispatch(clearJiosSearchForm());
      navigate(PATH_DASHBOARD.general.jios.root);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to create', { variant: 'error' });
    },
  });

  const handleCreate = async (data: JioCreateEditFormValues) => {
    submitCreateJio(jioFormValuesToRequestJio(data));
  };

  return (
    <JiosCreateEditForm
      defaultValues={jioSearchValues || undefined}
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
