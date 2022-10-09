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

export default function JiosSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jioFormValues = useSelector((state) => state.jioFormValues.data);

  const handleSearch = async (data: JioFormValues) => {
    dispatch(setJioFormValues(data));
    navigate('');
  };

  return (
    <JiosForm
      isSearch
      onSubmit={handleSearch}
      submitLabel="Search"
      submitIcon={<Iconify icon={'eva:search-outline'} width={24} height={24} />}
      defaultValues={jioFormValues || undefined}
    />
  );
}
