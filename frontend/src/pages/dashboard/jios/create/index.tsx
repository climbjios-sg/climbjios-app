import Iconify from 'src/components/Iconify';
import { useNavigate } from 'react-router-dom';
import JiosForm, { JioFormValues } from '../form/JiosForm';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { createJio } from 'src/services/jios';
import { jioFormValuesToRequestJio } from '../form/utils';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../store';
import { clearJioSearchForm } from '../../../../store/reducers/jioSearchForm';

export default function JiosCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Auto-populate default create values from search JioSearchForm
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);

  const { run: submitCreateJio } = useRequest(createJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Created!');
      dispatch(clearJioSearchForm());
      navigate(PATH_DASHBOARD.general.jios.root);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to create', { variant: 'error' });
    },
  });

  const handleCreate = async (data: JioFormValues) => {
    submitCreateJio(jioFormValuesToRequestJio(data));
  };

  return (
    <JiosForm
      defaultValues={jioSearchValues || undefined}
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
