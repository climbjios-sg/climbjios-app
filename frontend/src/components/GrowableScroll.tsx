import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { clearCache, useRequest } from 'ahooks';

import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import * as Defaults from './GrowableScrollDefaults';
import { concat } from 'lodash';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';

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
  cacheName?: string;
  staleTime?: number;
  reloadDeps: any;
  listItemComponent: ({ data }: { data: T }) => JSX.Element;
  subComponents?: SubComponentProps;
}

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
 * @param {string} cacheName Pass a cacheName to prevent reloading of
items whenever this component is rebuilt, as well as retaining scroll position
 * @param {string} staleTime Defaults to 5 minutes. Pass a number in milliseconds to set
how long before data is auto-refreshed. Only matters used if cacheName is provided
 **/
export default function GrowableScroll<T>({
  fetchMoreItemsCallback,
  cacheName,
  staleTime = 5 * 60 * 1000,
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
  const lifetimeUpdateCounter = useRef(0);
  const errorSnackbar = useCustomSnackbar();

  const {
    data,
    error,
    refresh,
    mutate,
    loading: fetchLoading,
  } = useRequest<CachedData<T>, any>(() => fetchMoreItemsCallback(undefined), {
    onError: () => errorSnackbar.enqueueError('Failed to load data.'),
    //fix bug where view scrolls down a bit after loading fresh data after staleTime is exceeded
    onSuccess: () =>
      mutate((oldData) => ({ ...oldData, list: oldData ? oldData.list : [], scrollY: 0 })),
    cacheKey: cacheName,
    staleTime: staleTime,
    refreshDeps: [reloadDeps],
  });
  const handleReload = useCallback(() => {
    clearCache(cacheName);
    refresh();
    document.getElementById('root')?.scrollTo(0, 0);
  }, [refresh, cacheName]);

  //custom implementation of auto reload of useInfiniteScroll when reloadDeps changes
  useEffect(() => {
    //useEffect is always triggered at the start; so use this to prevent triggering reload at the start
    if (lifetimeUpdateCounter.current !== 0) {
      handleReload();
    }
  }, [reloadDeps, handleReload, lifetimeUpdateCounter]);

  //delayed setting of scroll position because it always gets offset after the first set for some reason
  useEffect(() => {
    if (lifetimeUpdateCounter.current === 1) {
      if (data?.scrollY && cacheName) {
        document.getElementById('root')?.scrollTo(0, data.scrollY);
      }
    }
    lifetimeUpdateCounter.current += 1;
  });

  const firstFetch = !data;
  const noMore = data ? data.nextId === undefined : false;
  const loading = fetchLoading && firstFetch;
  const loadingMore = fetchLoading && !firstFetch;
  const noData = data ? data.list.length === 0 : false;

  const DisplayedData: JSX.Element = useMemo(
    () =>
      error ? (
        ErrorComponent
      ) : fetchLoading ? (
        LoadingComponent
      ) : noData ? (
        NoContentComponent
      ) : (
        <div>
          {data!.list.map((data) => (
            <Box key={data.id} sx={{ width: '100%', mt: 2, mb: 2 }}>
              <ListItemComponent data={data} />
            </Box>
          ))}
        </div>
      ),
    [
      error,
      fetchLoading,
      noData,
      data,
      ErrorComponent,
      LoadingComponent,
      NoContentComponent,
      ListItemComponent,
    ]
  );

  return useMemo(
    () => (
      <Grid container>
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
              dataLength={data ? data.list.length : 0}
              next={async () => {
                const newData = await fetchMoreItemsCallback(data?.nextId);
                mutate((oldData) => ({
                  ...oldData,
                  list: oldData ? concat(oldData.list, newData.list) : newData.list,
                  nextId: newData.nextId,
                }));
              }}
              hasMore={!noMore}
              loader={null}
              // Remembering scroll position
              onScroll={() =>
                mutate((oldData) => ({
                  ...oldData,
                  list: oldData ? oldData.list : [],
                  scrollY: document.getElementById('root')?.scrollTop,
                }))
              }
              // Pull to refresh props
              pullDownToRefresh
              refreshFunction={handleReload}
              pullDownToRefreshThreshold={50}
              pullDownToRefreshContent={
                <InfiniteScrollHelper sx={{ mb: 2 }}>
                  &#8595; Pull down to refresh
                </InfiniteScrollHelper>
              }
              releaseToRefreshContent={
                <InfiniteScrollHelper sx={{ mb: 2 }}>
                  &#8593; Release to refresh
                </InfiniteScrollHelper>
              }
              scrollableTarget="root"
            >
              {DisplayedData}
            </InfiniteScroll>
            {!noMore && (loadingMore ? LoadingMoreComponent : ScrollForMoreComponent)}
            {noMore && !loading && NoMoreComponent}
          </Box>
        </div>
      </Grid>
    ),
    [
      loading,
      loadingMore,
      noMore,
      data,
      mutate,
      fetchMoreItemsCallback,
      handleReload,
      DisplayedData,
      LoadingMoreComponent,
      ScrollForMoreComponent,
      NoMoreComponent,
    ]
  );
}
