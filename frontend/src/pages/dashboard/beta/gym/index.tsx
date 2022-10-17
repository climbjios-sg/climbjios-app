import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import Iconify from '../../../../components/Iconify';
import { useSelector } from '../../../../store';
import Page404 from '../../../Page404';

const FloatingContainer = styled('div')({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
});

export default function BetaGym() {
  const theme = useTheme();
  const { gymId } = useParams();
  const gym = useSelector((state) => state.gyms.data.find((gym) => gym.id === Number(gymId)));

  // If wrong gym id, return Not Found
  if (!gym) {
    return <Page404 />;
  }

  return (
    <>
      <FloatingContainer>
        <Paper
          elevation={1}
          sx={{
            margin: '0 auto',
            zIndex: theme.zIndex.drawer,
            width: '100vw',
            maxWidth: 680,
            borderRadius: 0,
          }}
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 2, width: '100%' }}
          >
            <IconButton color="primary">
              <Iconify icon="bx:video-plus" />
            </IconButton>
            <Typography variant="h4">{gym.name}</Typography>
            <IconButton color="primary">
              <Iconify icon="bx:video-plus" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex' }}>

          </Box>
        </Paper>
      </FloatingContainer>
    </>
  );
}
