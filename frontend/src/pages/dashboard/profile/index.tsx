import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate, Route, Routes } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import useGetIdentity from 'src/hooks/auth/useGetIdentity';
import useLogout from 'src/hooks/auth/useLogout';
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
