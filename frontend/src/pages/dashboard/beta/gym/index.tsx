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
import { PATH_DASHBOARD } from 'src/routes/paths';
import chroma from 'chroma-js';
import BetaCard from 'src/components/BetaCard';
import { User } from 'src/@types/user';
import { BetaDemo } from 'src/@types/beta';
import _ from 'lodash';
import MessageBarWithStore from '../../MessageBarWithStore';
import useGetGymGrades from 'src/hooks/services/useGetGymGrades';
import { useMemo, useState } from 'react';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { getBetas } from 'src/services/betas';
import { GymGrade } from 'src/@types/gym';
import { Wall } from 'src/@types/wall';
import { Color } from 'src/@types/color';
import { usePagination, useRequest } from 'ahooks';
import useErrorSnackbar from '../../../../hooks/useErrorSnackbar';
import InfiniteScroll from 'react-infinite-scroll-component';

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

// const FAKE_BETA: {
//   author: Partial<User>;
//   beta: BetaDemo;
// } = {
//   author: {
//     telegramHandle: '@rizhaow',
//   },
//   beta: {
//     imageUrl: 'https://i.ibb.co/k1yHPSz/image-27.png',
//     color: 'Red',
//     grade: '3 Bar',
//     wall: 'Slab',
//     gym: 'FitBloc',
//     createdAt: new Date(),
//   },
// };

const addAllOption = (list: { value: number; label: string }[]) => [
  // By default, if the value is undefined, we will fetch all data
  { value: undefined, label: 'All' },
  ...list,
];

export default function BetaGym() {
  // Number of Betas to fetch per page
  const pageSize = 10;
  const [selectedGymGrade, setSelectedGymGrade] = useState<GymGrade['id'] | undefined>(undefined);
  const [selectedWall, setSelectedWall] = useState<Wall['id'] | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<Color['id'] | undefined>(undefined);
  const errorSnackbar = useErrorSnackbar();
  // True iff user is scrolling
  const trigger = useScrollTrigger({
    target: window,
  });
  const theme = useTheme();
  const params = useParams();
  const gymId = Number(params.gymId);
  const gym = useSelector((state) => state.gyms.data.find((gym) => gym.id === gymId));
  const colors = useSelector((state) => state.colors.data);
  const walls = useSelector((state) => state.walls.data);
  const gymGrades = useGetGymGrades(Number(gymId));

  const colorOptions = useMemo(
    () => addAllOption(colors.map((color) => ({ value: color.id, label: capitalize(color.name) }))),
    [colors]
  );
  const gymGradeOptions = useMemo(
    () => addAllOption(gymGrades.map((gymGrade) => ({ value: gymGrade.id, label: gymGrade.name }))),
    [gymGrades]
  );
  const wallOptions = useMemo(
    () => addAllOption(walls.map((wall) => ({ value: wall.id, label: wall.name }))),
    [walls]
  );

  const getTargetBetas = (page: number) =>
    getBetas({
      gymId,
      gymGradeId: selectedGymGrade,
      wallId: selectedWall,
      colorId: selectedColor,
      page,
      pageSize,
    });

  const res = useRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Betas.');
    },
  });
  const betas = res.data?.data;

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
            <Select placeholder="Color" styles={colorStyles} options={colorOptions} />
            <Select placeholder="Grade" options={gymGradeOptions} />
            <Select placeholder="Wall" options={wallOptions} />
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
          {/* TODO set empty content */}
          {betas && betas.data.total > 0 && (
            <InfiniteScroll
              dataLength={betas.metadata.pageSize * betas.metadata.currentPage + betas.data.total}
              next={() => getTargetBetas(betas.metadata.currentPage + 1)}
              hasMore={!betas.metadata.isLastPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              refreshFunction={() => getTargetBetas(0)}
              pullDownToRefresh
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              }
            >
              {betas.data.results.map((beta) => (
                <div key={beta.id}>{JSON.stringify(beta)}</div>
              ))}
            </InfiniteScroll>
          )}
          {/* {_.range(0, 6).map((i) => (
          ))} */}
        </Grid>
      </Box>
    </>
  );
}
