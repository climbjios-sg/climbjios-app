import { Box, Paper } from '@mui/material';
import useAddToHomeScreen from 'src/hooks/useAddToHomeScreen';
import GymSearch from './GymSearch';
import FloatingContainer from '../../../components/FloatingContainer';
import GymCardsList from './list/GymCardsList';
import { useState } from 'react';

export default function Gyms() {
  useAddToHomeScreen();

  const [searchString, setSearchString] = useState('');

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
          <GymSearch searchString={searchString} setSearchString={setSearchString} />
          {/* <TestComp/> */}
        </Paper>
      </FloatingContainer>
      <Box sx={{ height: 65 }} />
      <GymCardsList searchString={searchString}/>
    </Box>
  );
}
