import {
  Box,
  capitalize,
  Grid,
  IconButton,
  Paper,
  Slide,
  Typography,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { Stack, styled } from '@mui/system';
import Select, { StylesConfig } from 'react-select';
import { Link, useParams } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { useSelector } from 'src/store';
import Page404 from 'src/pages/error/Page404';
import { COLORS, GRADES, WALLS } from './testData';
import { PATH_DASHBOARD } from 'src/routes/paths';
import chroma from 'chroma-js';
import BetaCard from 'src/components/BetaCard';
import { User } from 'src/@types/user';
import { BetaDemo } from 'src/@types/beta';
import _ from 'lodash';
import MessageBarWithStore from '../../MessageBarWithStore';

const FloatingContainer = styled('div')({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
});

const colorStyles: StylesConfig<any> = {
  option: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.value) }),
};

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color === 'transparent' ? color : chroma(color).alpha(0.7).css(),
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 5,
    height: 10,
    width: 10,
  },
});

const FAKE_BETA: {
  author: Partial<User>;
  beta: BetaDemo;
} = {
  author: {
    telegramHandle: '@rizhaow',
  },
  beta: {
    imageUrl: 'https://i.ibb.co/k1yHPSz/image-27.png',
    color: 'Red',
    grade: '3 Bar',
    wall: 'Slab',
    gym: 'FitBloc',
    createdAt: new Date(),
  },
};

export default function BetaGym() {
  const trigger = useScrollTrigger({
    target: window,
  });
  // TODO: Fetch and set data
  const colorOptions = COLORS;
  const wallOptions = WALLS;
  const gradeOptions = GRADES;

  const theme = useTheme();
  const { gymId } = useParams();
  const gym = useSelector((state) => state.gyms.data.find((gym) => gym.id === Number(gymId)));

  // If wrong gym id, return Not Found
  if (!gym) {
    return <Page404 />;
  }

  return (
    <>
      <FloatingContainer sx={{ zIndex: theme.zIndex.drawer }}>
        <MessageBarWithStore />
        <Paper
          elevation={1}
          sx={{
            margin: '0 auto',
            width: '100vw',
            maxWidth: 680,
            borderRadius: 0,
            pb: 2,
            pl: 1,
          }}
        >
          <Slide appear={false} direction="down" in={!trigger}>
            <Box
              sx={{
                display: trigger ? 'none' : 'flex',
                justifyContent: 'space-between',
                pt: 2,
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  sx={{ px: 1 }}
                  color="primary"
                  component={Link}
                  to={PATH_DASHBOARD.general.beta.root}
                >
                  <Iconify icon="eva:arrow-back-fill" />
                </IconButton>
                <Typography variant="h4">{gym.name}</Typography>
              </Box>
              <IconButton
                sx={{ px: 3 }}
                color="primary"
                component={Link}
                to={PATH_DASHBOARD.general.beta.create}
              >
                <Iconify icon="bx:video-plus" />
              </IconButton>
            </Box>
          </Slide>
          <Stack direction="row" spacing={2} sx={{ pl: 1, pt: 2 }}>
            <Select
              placeholder="Color"
              styles={colorStyles}
              options={colorOptions.map((color) => ({ value: color, label: capitalize(color) }))}
            />
            <Select
              placeholder="Grade"
              options={gradeOptions.map((grade) => ({ value: grade, label: grade }))}
            />
            <Select
              placeholder="Wall"
              options={wallOptions.map((wall) => ({ value: wall, label: wall }))}
            />
          </Stack>
        </Paper>
      </FloatingContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 19,
          pb: 12,
        }}
      >
        <Grid sx={{ maxWidth: 680 }} container rowSpacing={2} columnSpacing={2}>
          {_.range(0, 6).map((i) => (
            <Grid key={i} item xs={6} md={4}>
              <BetaCard author={FAKE_BETA.author} beta={FAKE_BETA.beta} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
