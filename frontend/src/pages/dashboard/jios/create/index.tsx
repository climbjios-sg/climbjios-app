import * as React from 'react';
import Iconify from 'src/components/Iconify';
import useRefresh from 'src/hooks/useRefresh';
import { Route, Routes, useNavigate } from 'react-router-dom';
import JiosForm, { JioFormValues } from '../JiosForm';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { createJio } from 'src/services/jios';

export default function JiosCreate() {
  const { enqueueSnackbar } = useSnackbar();
  const refresh = useRefresh();
  const navigate = useNavigate();

  const { run: submitCreateJio } = useRequest(createJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Created!');
      refresh();
      navigate('');
    },
    onError: (error) => {
      enqueueSnackbar('Failed to create', { variant: 'error' });
    },
  });

  const handleCreate = async (data: JioFormValues) => {
    submitCreateJio(data);
  };

  return (
    <JiosForm
      onSubmit={handleCreate}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
