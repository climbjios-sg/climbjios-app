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
      // TODO: handle FE validation checks
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
