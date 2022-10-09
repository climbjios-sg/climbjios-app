import * as React from 'react';
import Box from '@mui/material/Box';

import useAuth from '../../../hooks/useAuth';
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
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../../routes/paths';

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ pt: 5, pb: 100, maxWidth: 600, margin: '0 auto' }}>
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
              <ListItemButton>
                <ListItemIcon>
                  <Iconify icon="eva:edit-outline" />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => {
                auth.logout();
                navigate(PATH_AUTH.root)
              }}>
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
  );
}
