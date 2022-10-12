import * as React from 'react';
import Box from '@mui/material/Box';

import useAuth from '../../../hooks/useAuth';
import { useNavigate, Route, Routes } from 'react-router-dom';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../../../components/Iconify';
import { PATH_AUTH } from '../../../routes/paths';
// Sections
import ProfileEditForm from '../../../sections/profile/ProfileEditForm';

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="edit"
        element={
          <Box sx={{ pt: 5, minHeight: '100vh', pb: 20, maxWidth: 600, margin: '0 auto' }}>
            <ProfileEditForm isExistingUser={true} />
          </Box>
        }
      />
      <Route
        path=""
        element={
          <Box sx={{ pt: 5, minHeight: '100vh', pb: 20, maxWidth: 600, margin: '0 auto' }}>
            <Stack direction="column" alignItems="center" sx={{ width: '100%' }}>
              <Typography sx={{ mt: 1, textAlign: 'center' }} variant="h5">
                {auth.user?.name}
              </Typography>
              <Typography
                sx={{ mt: 1, transform: 'translateX(-2px)', textAlign: 'center', color: 'gray' }}
                variant="subtitle1"
              >
                {`@${auth.user?.username}`}
              </Typography>
            </Stack>
            <Box sx={{ bgcolor: 'background.paper', textAlign: 'left', mt: 3 }}>
              <nav>
                <List>
                  <ListItem>
                    <ListItemButton onClick={() => navigate('edit')}>
                      <ListItemIcon>
                        <Iconify icon="eva:edit-outline" />
                      </ListItemIcon>
                      <ListItemText primary="Edit Profile" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton
                      onClick={() => {
                        auth.logout();
                        navigate(PATH_AUTH.root);
                      }}
                    >
                      <ListItemIcon>
                        <Iconify icon="eva:log-out-outline" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
            </Box>
          </Box>
        }
      />
    </Routes>
  );
}
