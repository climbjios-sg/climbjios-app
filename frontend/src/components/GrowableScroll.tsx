import { useCallback, useEffect, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRequest, useSessionStorageState } from 'ahooks';

import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import * as Defaults from './GrowableScrollDefaults';
import { concat } from 'lodash';

interface CachedData<T> {
  list: (BasicListItem & T)[];
  nextId?: string;
  scrollY?: number;
}

export interface FetchMoreItemsResult<T> {
  list: (BasicListItem & T)[];
  nextId?: string;
}

export interface BasicListItem {
  id: string;
}

export interface GrowableScrollProps<T> {
  fetchMoreItemsCallback: (nextId?: string) => Promise<FetchMoreItemsResult<T & BasicListItem>>;
  clearItems?: boolean;
  cacheName: string;
  reloadDeps: any;
  // listItemComponent: ({ itemData }: ListItemComponentProps<T>) => React.ReactNode;
  listItemComponent: ({ data }: { data: T }) => JSX.Element;
  // listItemComponent: React.ReactNode;
  subComponents?: SubComponentProps;
}

//React.ComponentType is a callable; it is a function that returns an JSX.Element
//doing < XXX /> calls the function to return the JSX.Element
//React.ReactNode or JSX.Element is not a callable; youo do { XXX } instead

//edit: i actually have no clue what i'm writing and understand absolutely nothing
//about typing these god forsaken components in React
export interface SubComponentProps {
  errorComponent?: JSX.Element;
  loadingComponent?: JSX.Element;
  noContentComponent?: JSX.Element;
  noMoreComponent?: JSX.Element;
  scrollForMoreComponent?: JSX.Element;
  loadingMoreComponent?: JSX.Element;
}

/**
 * Create a scrollable list that can continuously retrieve data from the callback provided
 * @param {any} reloadDeps i don't actually really know how to do this dynamically but
maybe put all dependencies like seach params into an object and pass it as this prop
 * @param {boolean} clearItems defaults to true. Pass false to prevent reloading of
items whenever this component is rebuilt, as well as retaining scroll position
 * @param {string} cacheName is still necessary as the data is stored in a session cache even
if it is cleared upon re-render
 */
export default function GrowableScroll<T>({
  fetchMoreItemsCallback,
  clearItems = true,
  cacheName,
  reloadDeps = [],
  listItemComponent: ListItemComponent,
  subComponents,
}: GrowableScrollProps<T>) {
  const {
    errorComponent: ErrorComponent = Defaults.ErrorComponent,
    loadingComponent: LoadingComponent = Defaults.LoadingComponent,
    noContentComponent: NoContentComponent = Defaults.NoContentComponent,
    noMoreComponent: NoMoreComponent = Defaults.NoMoreComponent,
    scrollForMoreComponent: ScrollForMoreComponent = Defaults.ScrollForMoreComponent,
    loadingMoreComponent: LoadingMoreComponent = Defaults.LoadingMoreComponent,
  } = subComponents ?? {};
  const firstUpdate = useRef(true);
  const [cachedData, setCachedData] = useSessionStorageState<CachedData<T>>(
    `${cacheName}-scrollCache`,
    {
      defaultValue: { list: [], nextId: undefined, scrollY: undefined },
    }
  );

  const {
    run,
    error,
    loading: fetchLoading,
  } = useRequest(fetchMoreItemsCallback, {
    onSuccess: (data) => {
      setCachedData({
        ...cachedData,
        list: concat(cachedData.list, data.list),
        nextId: data.nextId,
      });
    },
    manual: true,
  });

  const firstFetch = cachedData.list.length === 0;
  const noMore = cachedData.nextId === undefined;
  const loading = fetchLoading && firstFetch;
  const loadingMore = fetchLoading && !firstFetch;

  const handleReload = useCallback(() => {
    setCachedData({
      list: [],
    });
    run(undefined);
  }, [setCachedData, run]);

  //call reload to load data on the very first run
  useEffect(() => {
    if (firstUpdate.current) {
      if (cachedData.list.length === 0) {
        handleReload();
      } else if (!clearItems) {
        document.getElementById('root')?.scrollTo(0, cachedData.scrollY ?? 0);
      }
    }
  }, [handleReload, cachedData, clearItems]);

  //custom implementation of auto reload of useInfiniteScroll when reloadDeps changes
  useEffect(() => {
    //useEffect is always triggered at the start; so use this to prevent triggering reload at the start
    if (!firstUpdate.current || clearItems) {
      handleReload();
    }
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  }, [reloadDeps, handleReload, clearItems]);

  //removed useMemo as it was causing a whole multiverse of typing errors
  //of which attempts to solve just led me in an infinite rabbit hole of
  //re-visiting the same stackoverflow threads and repeadtedly changing the code
  const DisplayedData: JSX.Element = error ? (
    ErrorComponent
  ) : loading ? (
    LoadingComponent
  ) : cachedData.list.length === 0 ? (
    NoContentComponent
  ) : (
    <div style={{ overflow: 'visible', height: 600, width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          '& infinite-scroll-component__outerdiv': {
            width: '100%',
          },
        }}
      >
        <InfiniteScroll
          dataLength={cachedData.list.length}
          next={() => run(cachedData.nextId)}
          hasMore={!noMore}
          loader={null}
          // Remembering scroll position
          onScroll={() =>
            setCachedData({
              ...cachedData,
              scrollY: document.getElementById('root')?.scrollTop,
            })
          }
          // Pull to refresh props
          pullDownToRefresh
          refreshFunction={handleReload}
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <InfiniteScrollHelper sx={{ mb: 2 }}>&#8595; Pull down to refresh</InfiniteScrollHelper>
          }
          releaseToRefreshContent={
            <InfiniteScrollHelper sx={{ mb: 2 }}>&#8593; Release to refresh</InfiniteScrollHelper>
          }
          scrollableTarget="root"
        >
          {cachedData.list.map((data) => (
            <Box key={data.id} sx={{ width: '100%', mt: 2, mb: 2 }}>
              {ListItemComponent({ data })}
              {/* <ListItemComponent data={data} /> */}
            </Box>
          ))}
        </InfiniteScroll>
        {!noMore && (loadingMore ? LoadingMoreComponent : ScrollForMoreComponent)}
        {noMore && NoMoreComponent}
      </Box>
    </div>
  );

  //https://stackoverflow.com/a/72399362/7577786 can use '!!' for some error when
  //using useMemo but you end up with other erros along the way...
  return <Grid container>{DisplayedData}</Grid>;
}
