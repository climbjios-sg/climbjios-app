import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Grid, Button, Divider, Box } from '@mui/material';
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
import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import useRefresh from 'src/hooks/ui/useRefresh';

//https://stackoverflow.com/a/59843241/7577786
const usePrevious = (value: any, initialValue: never[]) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (
  effectHook: React.EffectCallback,
  dependencies: React.DependencyList = [],
  dependencyNames: string[] = []
) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum: any, dependency: any, index: number) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || String(index);
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps as any[]).length) {
    console.log('[use-effect-debugger] ', changedDeps);
  }

  // useEffect(effectHook, [effectHook, ...dependencies]);
  useEffect(effectHook, dependencies);
  // useLayoutEffect(effectHook, dependencies);
};

export default function JioCardList() {
  const dispatch = useDispatch();
  const version = useVersion(); //version is updated when user pulls to refresh. when version number changes, listjios (below) is called to update jio list
  const refresh = useRefresh();
  const jioSearchValues = useSelector((state) => state.jioSearchForm.data);

  const { data, error, loading } = useSelector((state) => state.jios);
  console.log('==========RENDER ALL JIOS LIST============');
  console.log(`loading: ${loading}`);
  console.log(`version: ${version}`);
  console.log(`jios count: ${data.length}`);

  const displayedData = React.useMemo(() => {
    console.log(`---USEMEMO: UPDATE VIEW---`);
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
          {data.map((jio) => (
            <Box key={jio.id} sx={{ width: '100%', mt: 2 }}>
              <JioCard data={jio} />
            </Box>
          ))}
        </InfiniteScroll>
        <Box sx={{ width: '100%', mt: 4 }}>
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
        </Box>
      </Box>
    );
  }, [data, error, jioSearchValues, loading, refresh]);

  const firstUpdate = useRef(true);
  useEffectDebugger(
    // useEffect(
    () => {
      // if (firstUpdate.current && data.length > 0) {
      //   firstUpdate.current = false;
      //   return;
      // }

      console.log(`---USEFFECT: UPDATE JIOS LIST---`);

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
    },
    [version, dispatch, jioSearchValues],
    ['version', 'dispatch', 'jioSearchValues']
  );

  return <Grid container>{displayedData}</Grid>;
}
