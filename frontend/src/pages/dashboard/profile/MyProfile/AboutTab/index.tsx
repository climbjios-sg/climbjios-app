import useLogout from 'src/hooks/auth/useLogout';
import { User } from 'src/@types/user';
import {
  Stack,
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddToHomeScreenButton from 'src/components/a2hs/AddToHomeScreenButton';
import Iconify from 'src/components/Iconify';
import BioCard from 'src/components/profile/BioCard';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { MAIL_TO_SUPPORT_EMAIL, SUPPORT_TELEGRAM } from '../../../../../config';
import { outgoingLinkProps } from '../../../../../utils/common';

interface AboutTabProps {
  user: User;
}

export default function AboutTab({ user }: AboutTabProps) {
  const logout = useLogout();
  const theme = useTheme();

  return (
    <Stack direction="column" alignItems="center" spacing={3}>
      <BioCard
        data={user}
        action={
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to={PATH_DASHBOARD.general.profile.edit}
          >
            Edit
          </Button>
        }
      />

      <Paper sx={{ boxShadow: theme.customShadows.card, textAlign: 'left', width: '100%' }}>
        <nav>
          <List
            subheader={
              <Typography
                sx={{
                  pl: 3,
                  pt: 2,
                  pb: 1.2,
                }}
                variant="h5"
              >
                Settings
              </Typography>
            }
            sx={{
              py: 0,
              '& .MuiListItem-root': {
                py: 1.5,
              },
            }}
          >
            <AddToHomeScreenButton
              renderButton={({ onClick }) => (
                <>
                  <ListItem>
                    <ListItemButton onClick={onClick}>
                      <ListItemIcon>
                        <Iconify icon={'bxs:download'} color={theme.palette.grey[700]} />
                      </ListItemIcon>
                      <ListItemText primary={'Add ClimbJios to Home Screen'} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
            />
            <ListItem>
              <ListItemButton href={SUPPORT_TELEGRAM} {...outgoingLinkProps}>
                <ListItemIcon>
                  <Iconify icon={'jam:telegram'} color={'#2aabee'} />
                </ListItemIcon>
                <ListItemText primary={'Telegram Us'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton href={MAIL_TO_SUPPORT_EMAIL} {...outgoingLinkProps}>
                <ListItemIcon>
                  <Iconify icon={'eva:email-outline'} color={theme.palette.grey[700]} />
                </ListItemIcon>
                <ListItemText primary={'Email Us'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton
                onClick={() => {
                  logout();
                }}
              >
                <ListItemIcon>
                  <Iconify icon="material-symbols:logout-rounded" />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Paper>
    </Stack>
  );
}
