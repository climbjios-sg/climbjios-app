import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Iconify from '../../../../components/Iconify';
import { useSelector } from '../../../../store';

export default function BetaGymSearch() {
  const [searchValue, setSearchValue] = useState('');
  const gyms = useSelector((state) => state.gyms.data);

  return (
    <Box sx={{ pt: 5, pb: 20, minHeight: '100vh', maxWidth: 600, margin: '0 auto' }}>
      <Stack spacing={3}>
        <TextField
          placeholder="Search Gyms..."
          sx={{
            '.MuiOutlinedInput-root': {
              borderRadius: 30,
            },
          }}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                  icon="eva:search-outline"
                />
              </InputAdornment>
            ),
          }}
        />
        <Stack sx={{ paddingLeft: 1 }}>
          <Typography
            sx={{ pb: 1, alignItems: 'center', display: 'inline-flex' }}
            variant="subtitle2"
            color="text.secondary"
          >
            Gyms Near Me
          </Typography>
          {gyms
            .filter((gym) => gym.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((gym) => (
              <Link
                to={gym.id.toString()}
                key={gym.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography variant="h5" sx={{ py: 1.5 }}>
                  {gym.name}
                </Typography>
              </Link>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}
