import { Box, Button, IconButton, Paper, Slide, useScrollTrigger } from '@mui/material';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import Iconify from 'src/components/Iconify';
import { useSelector } from 'src/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import MessageBarWithStore from '../../MessageBarWithStore';
import useGetGymGrades from 'src/hooks/services/useGetGymGrades';
import { useCallback, useMemo, useState, useEffect } from 'react';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { Gym, GymGrade } from 'src/@types/gym';
import { Wall } from 'src/@types/wall';
import { Color } from 'src/@types/color';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import NoContentGif from 'src/assets/no-content.gif';
import EmptyContent from 'src/components/EmptyContent';
import BetasInfiniteScroll from 'src/components/betas/BetaInfiniteScroll';
import { BETAS_PAGE_SIZE } from 'src/config';
import Image from 'src/components/Image';
import useGetBetas from 'src/hooks/services/useGetBetas';
import { displayBetaColor } from 'src/components/betas/utils';
import useGetGymList from 'src/hooks/services/options/useGetGymList';
import FloatingContainer from 'src/components/FloatingContainer';
import { ReactSelectWithIcon } from '../../../../components/inputs/SelectWithIcon';
import FilterSelect from 'src/components/inputs/FilterSelect';
import { ListBetasRequest } from 'src/@types/beta';
import MenuItemWithIcon from 'src/components/inputs/MenuItemLabelWithIcon';
import WallIcon from 'src/components/betas/WallIcon';

export default function BetasList() {
  // Number of Betas to fetch per page
  const [selectedGym, setSelectedGym] = useState<Gym['id'] | undefined>();
  const [selectedGymGrade, setSelectedGymGrade] = useState<GymGrade['id'] | null>(null);
  const [selectedWall, setSelectedWall] = useState<Wall['id'] | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color['id'] | null>(null);
  const errorSnackbar = useCustomSnackbar();
  // True iff user is scrolling
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
  });
  const { data: gyms } = useGetGymList();
  const colors = useSelector((state) => state.colors.data);
  const walls = useSelector((state) => state.walls.data);
  const viewVersion = useSelector((state) => state.ui.viewVersion);
  const getBetas = useGetBetas();
  const gymGrades = useGetGymGrades(
    selectedGym || 1 // Hack: Get gym grades of gym 1, if All gyms are selected. This gymGrades won't be render in that case. Doing this because of rule of hooks don't allow conditional hooks.
  );
  const gymOptions = useMemo(
    () => gyms.map((gym) => ({ value: Number(gym.value), label: gym.label })),
    [gyms]
  );
  const colorOptions = useMemo(
    () =>
      colors.map((color) => ({
        value: color.id,
        label: (
          <MenuItemWithIcon
            icon={
              <Iconify
                icon="akar-icons:circle-fill"
                color={displayBetaColor(color.name.toLowerCase())}
              />
            }
            text={color.name}
          />
        ),
      })),
    [colors]
  );

  const wallOptions = useMemo(
    () =>
      walls.map((wall) => ({
        value: wall.id,
        label: <MenuItemWithIcon icon={<WallIcon wall={wall.name} />} text={wall.name} />,
      })),
    [walls]
  );

  const gymGradeOptions = useMemo(
    () => gymGrades.map((gymGrade) => ({ value: gymGrade.id, label: gymGrade.name })),
    [gymGrades]
  );

  // Reset selectedGymGrade to null when selected gym is null
  useEffect(() => {
    if (selectedGym === undefined) {
      setSelectedGymGrade(null);
    }
  }, [selectedGym]);

  const getTargetBetas = useCallback(
    (page: number) => {
      const request: ListBetasRequest = {
        page,
        pageSize: BETAS_PAGE_SIZE,
      };

      if (selectedGym) {
        request.gymId = selectedGym;
      }

      if (selectedGymGrade) {
        request.gymGradeId = selectedGymGrade;
      }

      if (selectedWall) {
        request.wallId = selectedWall;
      }

      if (selectedColor) {
        request.colorId = selectedColor;
      }

      return getBetas(request);
    },
    [getBetas, selectedColor, selectedGym, selectedGymGrade, selectedWall]
  );

  const { loading, data, mutate, refresh } = useSafeRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueError('Failed to get Betas.');
    },
    refreshDeps: [viewVersion, selectedGymGrade, selectedWall, selectedColor, selectedGym],
  });

  const createBetaLink = PATH_DASHBOARD.general.betas.create(selectedGym);

  return (
    <>
      <FloatingContainer>
        <MessageBarWithStore />
        <Paper
          elevation={1}
          sx={{
            margin: '0 auto',
            width: '100vw',
            maxWidth: 600,
            borderRadius: 0,
            pb: 1.5,
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
              <ReactSelectWithIcon
                sx={{ ml: 1, width: '90%' }}
                icon={<Iconify icon="eva:pin-outline" height={24} width={24} />}
                options={gymOptions}
                onChange={(option) => {
                  setSelectedGym(option?.value);
                }}
              />
              <IconButton
                sx={{
                  px: 3,
                  borderRadius: 1,
                }}
                color="primary"
                component={Link}
                to={createBetaLink}
              >
                <Iconify icon="bx:video-plus" />
              </IconButton>
            </Box>
          </Slide>
          <Stack
            direction="row"
            spacing={1}
            sx={{ pl: 1, pt: 1.5, overflow: 'scroll', width: '100%' }}
          >
            <FilterSelect
              sx={{ width: 110 }}
              value={selectedColor}
              options={colorOptions}
              onChange={(e) => {
                setSelectedColor(Number(e.target.value));
              }}
              onClear={() => {
                setSelectedColor(null);
              }}
              labelProps={{
                icon: 'eva:color-palette-outline',
                text: 'Color',
              }}
            />

            <FilterSelect
              sx={{ width: selectedWall ? 120 : 100 }}
              value={selectedWall}
              options={wallOptions}
              onChange={(e) => {
                setSelectedWall(Number(e.target.value));
              }}
              onClear={() => {
                setSelectedWall(null);
              }}
              labelProps={{
                icon: 'tabler:wall',
                text: 'Wall',
              }}
            />

            {/* Don't render grades when selected gym is undefined */}
            {selectedGym !== undefined && (
              <FilterSelect
                sx={{ width: 110 }}
                value={selectedGymGrade}
                options={gymGradeOptions}
                onChange={(e) => {
                  setSelectedGymGrade(Number(e.target.value));
                }}
                onClear={() => {
                  setSelectedGymGrade(null);
                }}
                labelProps={{
                  icon: 'eva:bar-chart-2-outline',
                  text: 'Grade',
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
          pt: 16,
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
              <Image alt="No content" style={{ borderRadius: 20 }} src={NoContentGif} />
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
          refresh={refresh}
          fetchPage={getTargetBetas}
        />
      </Box>
    </>
  );
}
