import * as React from 'react';
import Box from '@mui/material/Box';
import { Route, Routes } from 'react-router-dom';
import MyProfile from './MyProfile';

export default function Profile() {
  return (
    <Routes>
      <Route
        path="edit"
        element={
          <Box sx={{ pt: 5, minHeight: '100vh', pb: 20, maxWidth: 600, margin: '0 auto' }}>
            {null}
          </Box>
        }
      />
      <Route path="" element={<MyProfile />} />
    </Routes>
  );
}
