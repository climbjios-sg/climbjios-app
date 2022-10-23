import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Slide,
  Typography,
  TypographyProps,
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
import { Beta, BetaDemo } from 'src/@types/beta';
import _ from 'lodash';
import MessageBarWithStore from '../../MessageBarWithStore';
import useGetGymGrades from 'src/hooks/services/useGetGymGrades';
import { useCallback, useMemo, useState } from 'react';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { getBetas } from 'src/services/betas';
import { GymGrade } from 'src/@types/gym';
import { Wall } from 'src/@types/wall';
import { Color } from 'src/@types/color';
import { useRequest } from 'ahooks';
import useErrorSnackbar from '../../../../hooks/useErrorSnackbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoContentGif from 'src/assets/no-content.gif';
import EmptyContent from '../../../../components/EmptyContent';
import BetaLoader from './BetaLoader';
import cloneDeep from 'lodash/cloneDeep';
import useGetGyms from '../../../../hooks/services/useGetGyms';

const FloatingContainer = styled('div')({
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100vw',
});

const colorStyles: StylesConfig<any> = {
  option: (styles, { data }) => ({ ...styles, ...dot(data.label) }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.label) }),
};

const dot = (color = 'All') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color === 'All' ? `#ca97d4` : chroma(color).alpha(0.7).css(),
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 5,
    height: 10,
    width: 10,
  },
});

const StyledInfiniteScroll = styled(InfiniteScroll)({
  maxWidth: 600,
  width: '100vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 16,
  rowGap: 16,
  padding: '0 12px',
  '& > div:first-of-type': {
    gridColumn: 'span 2',
  },
});

const InfiniteScrollHelper = styled((props: TypographyProps) => (
  <Typography {...props} variant="h5" />
))({
  gridColumn: 'span 2',
  textAlign: 'center',
  justifySelf: 'center',
});

// Undefined stands for selecting all values
const ALL_VALUES = undefined;
type ALL_VALUES_TYPE = undefined;

const addAllOption = (list: { value: number; label: string }[]) => [
  // By default, if the value is undefined, we will fetch all data
  { value: ALL_VALUES, label: 'All' },
  ...list,
];

export default function BetaGym() {
  // Number of Betas to fetch per page
  const PAGE_SIZE = 10;
  const [selectedGymGrade, setSelectedGymGrade] = useState<GymGrade['id'] | ALL_VALUES_TYPE>(
    ALL_VALUES
  );
  const [selectedWall, setSelectedWall] = useState<Wall['id'] | ALL_VALUES_TYPE>(ALL_VALUES);
  const [selectedColor, setSelectedColor] = useState<Color['id'] | ALL_VALUES_TYPE>(ALL_VALUES);
  const errorSnackbar = useErrorSnackbar();
  // True iff user is scrolling
  const trigger = useScrollTrigger({
    target: window,
  });
  const theme = useTheme();
  const params = useParams();
  const gymId = Number(params.gymId);
  const gym = useGetGyms()?.find(gym => gym.id === gymId);
  const colors = useSelector((state) => state.colors.data);
  const walls = useSelector((state) => state.walls.data);
  const viewVersion = useSelector((state) => state.ui.viewVersion);
  const gymGrades = useGetGymGrades(Number(gymId));

  const colorOptions = useMemo(
    () => addAllOption(colors.map((color) => ({ value: color.id, label: color.name }))),
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

  const getTargetBetas = useCallback(
    (page: number) =>
      getBetas({
        gymId,
        gymGradeId: selectedGymGrade,
        wallId: selectedWall,
        colorId: selectedColor,
        page,
        pageSize: PAGE_SIZE,
      }),
    [gymId, selectedColor, selectedGymGrade, selectedWall]
  );

  const res = useRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Betas.');
    },
    refreshDeps: [viewVersion, selectedGymGrade, selectedWall, selectedColor],
  });
  const { loading } = res;
  const betas = res.data?.data;

  const renderBetas = () =>
    betas && betas.data.total > 0 ? (
      <StyledInfiniteScroll
        dataLength={betas.metadata.pageSize * betas.metadata.currentPage + betas.data.total}
        next={async () => {
          // Update data
          const newResponse = await getTargetBetas(betas.metadata.currentPage + 1);
          res.mutate((oldReponse) => {
            newResponse.data.data.results = [
              ...(oldReponse?.data.data.results || []),
              ...newResponse.data.data.results,
            ];
            return newResponse;
          });
        }}
        hasMore={!betas.metadata.isLastPage}
        loader={<></>}
        endMessage={<InfiniteScrollHelper>That's all!</InfiniteScrollHelper>}
        refreshFunction={() => getTargetBetas(0)}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <InfiniteScrollHelper>&#8595; Pull down to refresh</InfiniteScrollHelper>
        }
        releaseToRefreshContent={
          <InfiniteScrollHelper>&#8593; Release to refresh</InfiniteScrollHelper>
        }
      >
        {betas.data.results.map((beta) => (
          <BetaCard key={beta.id} beta={beta} />
        ))}
      </StyledInfiniteScroll>
    ) : (
      <Box>
        <EmptyContent title="No Betas yet" description="Why not try creating one?">
          <img alt="No content" style={{ borderRadius: 20 }} src={NoContentGif} />
          <Button
            sx={{ mt: 3 }}
            startIcon={<Iconify color="white" icon="bx:video-plus" />}
            variant="contained"
            component={Link}
            to={PATH_DASHBOARD.general.beta.create}
          >
            Upload a Beta
          </Button>
        </EmptyContent>
      </Box>
    );

  // If wrong gym id, return Not Found
  if (!gymId) {
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
            maxWidth: 600,
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
                <Typography variant="h4">{gym?.name}</Typography>
              </Box>
              <IconButton
                sx={{ px: 3 }}
                color="primary"
                component={Link}
                to={`${PATH_DASHBOARD.general.beta.create}?gymId=${gymId}`}
              >
                <Iconify icon="bx:video-plus" />
              </IconButton>
            </Box>
          </Slide>
          <Stack direction="row" spacing={2} sx={{ pl: 1, pt: 2 }}>
            <Select
              placeholder="Color"
              options={colorOptions}
              onChange={(option) => {
                setSelectedColor(option?.value);
              }}
              styles={colorStyles}
            />
            <Select
              placeholder="Grade"
              options={gymGradeOptions}
              onChange={(option) => {
                setSelectedGymGrade(option?.value);
              }}
            />
            <Select
              placeholder="Wall"
              options={wallOptions}
              onChange={(option) => {
                setSelectedWall(option?.value);
              }}
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
        {loading ? <BetaLoader /> : renderBetas()}
      </Box>
    </>
  );
}
