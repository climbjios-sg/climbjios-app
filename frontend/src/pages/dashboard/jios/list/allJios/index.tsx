import * as React from 'react';
import { useEffect } from 'react';
import { Grid, Button, Divider } from '@mui/material';
import useVersion from 'src/hooks/ui/useVersion';
import JioCard from 'src/components/jios/JioCard';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import EmptyJiosContent from 'src/components/jios/EmptyJiosContent';
import EmptyContent from 'src/components/EmptyContent';
import { useDispatch, useSelector } from 'src/store';
import { listJios } from 'src/store/reducers/jios';
import { getDateTimeString } from 'src/utils/formatTime';
import { GetJioListRequest } from 'src/@types/jio';
import CreateJioButton from 'src/components/jios/CreateJioButton';
import InfiniteScroll from 'react-infinite-scroll-component';
import useRefresh from '../../../../../hooks/ui/useRefresh';
import InfiniteScrollHelper from '../../../../../components/InfiniteScrollHelper';

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
      <>
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
          {data.map((jio) => (
            <Grid key={jio.id} sx={{ width: '100%', mt: 2 }} item>
              <JioCard data={jio} />
            </Grid>
          ))}
        </InfiniteScroll>
        <Grid sx={{ width: '100%', mt: 4 }} item>
          <Divider textAlign="center">Can't find the right Jio? 🤔</Divider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 25,
            }}
          >
            <CreateJioButton />
          </div>
        </Grid>
      </>
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
