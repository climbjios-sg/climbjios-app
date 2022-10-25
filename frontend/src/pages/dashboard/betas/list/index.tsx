import { Box, Button, IconButton, Paper, Slide, useScrollTrigger, useTheme } from '@mui/material';
import { Stack, styled } from '@mui/system';
import Select, { StylesConfig } from 'react-select';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { useSelector } from 'src/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import chroma from 'chroma-js';
import MessageBarWithStore from '../../MessageBarWithStore';
import useGetGymGrades from 'src/hooks/services/useGetGymGrades';
import { useCallback, useMemo, useState, useEffect } from 'react';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { getBetas } from 'src/services/betas';
import { Gym, GymGrade } from 'src/@types/gym';
import { Wall } from 'src/@types/wall';
import { Color } from 'src/@types/color';
import useErrorSnackbar from '../../../../hooks/useErrorSnackbar';
import NoContentGif from 'src/assets/no-content.gif';
import EmptyContent from '../../../../components/EmptyContent';
import useGetGyms from '../../../../hooks/services/useGetGyms';
import BetasInfiniteScroll from '../../../../components/betas/BetaInfiniteScroll';
import { BETAS_PAGE_SIZE } from 'src/config';

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

// Undefined stands for selecting all values
const ALL_VALUES = undefined;
type ALL_VALUES_TYPE = undefined;
const getAllOption = () => ({ value: ALL_VALUES, label: 'All' });

const addAllOption = (list: { value: number; label: string }[]) => [
  // By default, if the value is undefined, we will fetch all data
  getAllOption(),
  ...list,
];

export default function BetasList() {
  // Number of Betas to fetch per page
  const [selectedGym, setSelectedGym] = useState<Gym['id'] | ALL_VALUES_TYPE>(ALL_VALUES);
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
  const gyms = useGetGyms();
  const colors = useSelector((state) => state.colors.data);
  const walls = useSelector((state) => state.walls.data);
  const viewVersion = useSelector((state) => state.ui.viewVersion);
  const gymGrades = useGetGymGrades(
    selectedGym || 1 // Hack: Get gym grades of gym 1, if All gyms are selected. This gymGrades won't be render in that case. Doing this because of rule of hooks don't allow conditional hooks.
  );
  const gymOptions = useMemo(
    () => addAllOption(gyms.map((gym) => ({ value: gym.id, label: gym.name }))),
    [gyms]
  );
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

  // Reset selectedGymGrade to ALL_VALUES when selected gym is ALL_VALUES
  useEffect(() => {
    if (selectedGym === ALL_VALUES) {
      setSelectedGymGrade(ALL_VALUES);
    }
  }, [selectedGym]);

  const getTargetBetas = useCallback(
    (page: number) =>
      getBetas({
        gymId: selectedGym,
        gymGradeId: selectedGymGrade,
        wallId: selectedWall,
        colorId: selectedColor,
        page,
        pageSize: BETAS_PAGE_SIZE,
      }),
    [selectedColor, selectedGym, selectedGymGrade, selectedWall]
  );

  const { loading, data, mutate } = useSafeRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Betas.');
    },
    refreshDeps: [viewVersion, selectedGymGrade, selectedWall, selectedColor, selectedGym],
  });

  const createBetaLink = PATH_DASHBOARD.general.betas.create(selectedGym);

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
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  border: 'solid 1px hsl(0, 0%, 80%)',
                  borderRadius: 10,
                  paddingLeft: 1,
                  py: '1px',
                  ml: 1,
                  '& .gym__control': {
                    border: 'none !important',
                    boxShadow: 'none !important',
                    background: 'none',
                    minWidth: 240,
                  },
                }}
              >
                <Iconify icon="eva:pin-outline" height={24} width={24} />
                <Select
                  classNamePrefix="gym"
                  options={gymOptions}
                  defaultInputValue="All"
                  onChange={(option) => {
                    setSelectedGym(option?.value);
                  }}
                />
              </Stack>
              <IconButton
                sx={{ px: 3 }}
                color="primary"
                component={Link}
                to={PATH_DASHBOARD.general.betas.create(selectedGym)}
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
              placeholder="Wall"
              options={wallOptions}
              onChange={(option) => {
                setSelectedWall(option?.value);
              }}
            />
            {/* Don't render grades when selected gym is all */}
            {selectedGym !== ALL_VALUES && (
              <Select
                placeholder="Grade"
                options={gymGradeOptions}
                onChange={(option) => {
                  setSelectedGymGrade(option?.value);
                }}
              />
            )}
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
        <BetasInfiniteScroll
          loading={loading}
          data={data}
          onFetchPage={(newResponse) => {
            mutate((oldResponse) => {
              newResponse.data.data.results = [
                ...(oldResponse?.data.data.results || []),
                ...newResponse.data.data.results,
              ];
              return newResponse;
            });
          }}
          emptyContent={
            <EmptyContent title="No Betas yet" description="Why not try creating one?">
              <img alt="No content" style={{ borderRadius: 20 }} src={NoContentGif} />
              <Button
                sx={{ mt: 3 }}
                startIcon={<Iconify color="white" icon="bx:video-plus" />}
                variant="contained"
                component={Link}
                to={createBetaLink}
              >
                Upload a Beta
              </Button>
            </EmptyContent>
          }
          fetchPage={getTargetBetas}
        />
      </Box>
    </>
  );
}
