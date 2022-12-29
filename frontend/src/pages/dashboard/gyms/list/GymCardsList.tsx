import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button, Divider, Box } from '@mui/material';
import useVersion from 'src/hooks/ui/useVersion';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import EmptyJiosContent from 'src/components/jios/EmptyJiosContent';
import EmptyContent from 'src/components/EmptyContent';
import { useDispatch, useSelector } from 'src/store';
import { listJios } from 'src/store/reducers/jios';
import { getDateTimeString } from 'src/utils/formatTime';
import { GetJioListRequest } from 'src/@types/jio';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import useRefresh from 'src/hooks/ui/useRefresh';
import GymCard from './GymCard';
import Iconify from 'src/components/Iconify';

const dummyData = [
  {
    id: 1,
    name: 'BlocHead',
    logoUrl:
      'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
    gymOutlets: [
      {
        isClosed: false,
        gymId: 123,
        name: 'BlocHead Bedok',
        address: 'Bedok North Road',
      },
      {
        isClosed: false,
        gymId: 321,
        name: 'BlocHead Aljunied',
        address: 'Aljunied Address',
      },
    ],
  },
  {
    id: 2,
    name: 'BoulderRealm',
    logoUrl:
      'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
    gymOutlets: [
      {
        isClosed: false,
        gymId: 123,
        name: 'BlocHead Bedok',
        address: 'Bedok North Road',
      },
      {
        isClosed: false,
        gymId: 321,
        name: 'BlocHead Aljunied',
        address: 'Aljunied Address',
      },
    ],
  },
];

export default function JioCardList() {
  const dispatch = useDispatch();
  const version = useVersion();
  const refresh = useRefresh();
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);

  const { data, error, loading } = useSelector((state) => state.jios);

  const displayedData = React.useMemo(() => {
    if (error) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <EmptyContent sx={{ py: 3 }} title="We have an error! That's embarassing 😢" />
            <Button variant="contained">Contact Support</Button>
          </div>
        </Grid>
      );
    }

    if (loading) {
      return (
        <Grid sx={{ width: '100%', mt: 2 }} item>
          <JioCardLoader />
        </Grid>
      );
    }

    // If no content
    if (data.length === 0) {
      // If is searching
      if (jioSearchValues !== null) {
        return (
          <EmptyJiosContent
            title="No Jios matched your search."
            description="You can create one based on your search filters."
          />
        );
      }

      // If not searching
      return <EmptyJiosContent title="No Jios now." description="Why not create one?" />;
    }

    return (
      <Box
        sx={{
          width: '100%',
          '& infinite-scroll-component__outerdiv': {
            width: '100%',
          },
        }}
      >
        <InfiniteScroll
          // Note: We are using this comoponent just for pull-to-refresh
          // No pagination is implemented
          // Pagination related props are stubs
          dataLength={data.length}
          next={() => {}}
          hasMore={false}
          loader={null}
          // Pull to refresh props
          pullDownToRefresh
          refreshFunction={refresh}
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <InfiniteScrollHelper sx={{ mb: 2 }}>&#8595; Pull down to refresh</InfiniteScrollHelper>
          }
          releaseToRefreshContent={
            <InfiniteScrollHelper sx={{ mb: 2 }}>&#8593; Release to refresh</InfiniteScrollHelper>
          }
          scrollableTarget="root"
        >
          {dummyData.map((gym) => (
            <Box key={gym.id} sx={{ width: '100%', mt: 2, mb: 2 }}>
              <GymCard data={gym} />
            </Box>
          ))}
        </InfiniteScroll>
        <Box sx={{ width: '100%', mt: 4 }}>
          <Divider textAlign="center">Can't find a gym? 🤔</Divider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 25,
            }}
          >
            <Button
              size="large"
              startIcon={<Iconify icon={'eva:plus-outline'} color="white" />}
              variant="contained"
              fullWidth
            >
              (unimplimented) Report missing gym
            </Button>
          </div>
        </Box>
      </Box>
    );
  }, [data, error, jioSearchValues, loading, refresh]);

  useEffect(() => {
    if (!jioSearchValues) {
      dispatch(listJios({}));
      return;
    }

    const searchParams = {} as GetJioListRequest;
    if (jioSearchValues.date) {
      searchParams.startDateTime = getDateTimeString(jioSearchValues.date, '00:00');
      searchParams.endDateTime = getDateTimeString(jioSearchValues.date, '23:59');
    }

    if (jioSearchValues.gymId) {
      searchParams.gymId = jioSearchValues.gymId;
    }

    if (jioSearchValues.type) {
      searchParams.type = jioSearchValues.type;
    }

    dispatch(listJios(searchParams));
  }, [version, dispatch, jioSearchValues]);

  return <Grid container>{displayedData}</Grid>;
}
