import * as React from 'react';
import Iconify from 'src/components/Iconify';
import useRefresh from 'src/hooks/useRefresh';
import { useNavigate, useParams } from 'react-router-dom';
import JiosForm, { JioFormValues } from '../JiosForm';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { updateJio } from 'src/services/jios';

export default function JiosEdit() {
  const { id } = useParams();
  const jioId = Number(id);
  const { enqueueSnackbar } = useSnackbar();
  const refresh = useRefresh();
  const navigate = useNavigate();

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

  return (
    <JiosForm
      // TODO: get form instance from posts/id
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
