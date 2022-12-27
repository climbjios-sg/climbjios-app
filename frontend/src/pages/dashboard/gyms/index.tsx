import * as React from 'react';
import { styled } from '@mui/system';
import { TabContext, TabPanel } from '@mui/lab';
import { Tab, Tabs, Box, Paper, Stack, useScrollTrigger, Slide } from '@mui/material';
import JioCardList from '../jios/list/allJios';
import { useSearchParams } from 'react-router-dom';
import useAddToHomeScreen from 'src/hooks/useAddToHomeScreen';
import JioSearch from './search';
import FloatingContainer from '../../../components/FloatingContainer';

export default function Gyms() {
  useAddToHomeScreen();

  return (
    <Box sx={{ pt: 2, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
      <FloatingContainer>
        <Paper
          elevation={1}
          sx={{
            zIndex: 1000,
            margin: '0 auto',
            width: '100vw',
            maxWidth: '600px',
            px: 2,
            borderRadius: 0,
          }}
        >
          <JioSearch />
        </Paper>
      </FloatingContainer>
      {/* Open Jios Tab */}
      <Box sx={{ height: 160 }} />
      <JioCardList />
    </Box>
  );
}
