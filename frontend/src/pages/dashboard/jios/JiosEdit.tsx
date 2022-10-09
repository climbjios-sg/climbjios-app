import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import JioCardList from './JioCardList';
import MyJioCardList from './MyJioCardList';
import { ListJiosArgs } from '../../../store/reducers/jios';
import useRefresh from 'src/hooks/useRefresh';
import { Route, Routes, useNavigate } from 'react-router-dom';
import JiosForm, { JioFormValues } from './JiosForm';
import { useDispatch, useSelector } from '../../../store';
import { setJioFormValues } from '../../../store/reducers/jioFormValues';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack';
import { createJio, updateJio } from 'src/services/jios';

export default function JiosEdit() {
  const { enqueueSnackbar } = useSnackbar();
  const refresh = useRefresh();
  const navigate = useNavigate();

  const { run: submitUpdateJio } = useRequest(updateJio, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Updated!');
      // TODO: need to refresh again?
      refresh();
      navigate('');
    },
    onError: () => {
      enqueueSnackbar('Failed to update', { variant: 'error' });
    },
  });

  const handleEdit = async (data: JioFormValues) => {
    // FIXME: replace dummy id
    submitUpdateJio(data, 0);
  };

  return (
    <JiosForm
      onSubmit={handleEdit}
      submitLabel="Submit"
      submitIcon={<Iconify icon={'eva:add-outline'} width={24} height={24} />}
    />
  );
}
