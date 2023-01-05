import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useInfiniteScroll } from 'ahooks';
import { useInfiniteScroll, useSessionStorageState } from 'ahooks';

import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import * as Defaults from './CustomInfiniteScrollDefaults';
import { concat } from 'lodash';
// import { Data, InfiniteScrollOptions, Service } from 'ahooks/lib/useInfiniteScroll/types';

export interface FetchMoreItemsResult<T> {
  list: T[];
  nextId?: string;
}

interface BasicListItem {
  id: string;
}

export interface ListViewProps<T> {
  fetchMoreItemsCallback: (nextId?: string) => Promise<FetchMoreItemsResult<T & BasicListItem>>;
  reloadDeps: any;
  // listItemComponent: ({ itemData }: ListItemComponentProps<T>) => React.ReactNode;
  listItemComponent: ({ data }: { data: T }) => JSX.Element;
  // listItemComponent: React.ReactNode;
  subComponents?: SubComponentProps;
}

export interface SubComponentProps {
  errorComponent?: React.ComponentType;
  loadingComponent?: React.ComponentType;
  noContentComponent?: React.ComponentType;
  noMoreComponent?: React.ComponentType;
  scrollForMoreComponent?: React.ComponentType;
  loadingMoreComponent?: React.ComponentType;
}

// https://ahooks.js.org/hooks/use-infinite-scroll#scrolling-to-automatically-load
export default function CustomInfiniteScroll<T>({
  fetchMoreItemsCallback,
  reloadDeps = [],
  listItemComponent: ListItemComponent,
  subComponents,
}: ListViewProps<T>) {
  const {
    errorComponent: ErrorComponent = Defaults.ErrorComponent,
    loadingComponent: LoadingComponent = Defaults.LoadingComponent,
    noContentComponent: NoContentComponent = Defaults.NoContentComponent,
    noMoreComponent: NoMoreComponent = Defaults.NoMoreComponent,
    scrollForMoreComponent: ScrollForMoreComponent = Defaults.ScrollForMoreComponent,
    loadingMoreComponent: LoadingMoreComponent = Defaults.LoadingMoreComponent,
  } = subComponents ?? {};
  const ref = useRef(null);
  // const ref = useRef<HTMLDivElement>(null);
  const firstUpdate = useRef(true);

  const [shouldReload, setShouldReload] = useState(false);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [cachedList, setCachedList] = useSessionStorageState<(T & BasicListItem)[]>('test-list', {
    defaultValue: [],
  });
  const [cachedNextId, setCachedNextId] = useSessionStorageState<string | undefined>('test-id', {
    defaultValue: undefined,
  });

  const { loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => fetchMoreItemsCallback(cachedNextId),
    // (d) => fetchMoreItemsCallback(d?.nextId),
    {
      target: ref,
      isNoMore: (d) => cachedNextId === undefined,
      onSuccess: (data) => {
        setCachedNextId(data.nextId);
        setCachedList(concat(cachedList, data.list));
      },
      onError: (e) => {
        console.log('error: ');
        console.log(e);
        setError(e);
      },
      manual: true,
    }
  );

  if (shouldReload) {
    setShouldReload(false);
    reload();
  }

  const handleReload = useCallback(() => {
    console.log('CUSTOM RELOAD');
    setCachedList([]);
    setCachedNextId(undefined);
    // console.log('cachedNextId: ' + cachedNextId ?? 'undefined');
    setShouldReload(true);
    // reload();
  }, [setCachedList, setCachedNextId]);

  //custom implementation of auto reload of useInfiniteScroll when reloadDeps changes
  useEffect(() => {
    //useEffect is always triggered at the start; so use this to prevent triggering reload at the start
    if (!firstUpdate.current) {
      console.log('AUTO CUSTOM RELOAD');
      handleReload();
    } else {
      firstUpdate.current = false;
    }
  }, [reloadDeps, handleReload]);

  const displayedData = useMemo(() => {
    if (error) {
      return <ErrorComponent />;
    }

    if (loading) {
      return <LoadingComponent />;
    }

    if (cachedList.length === 0) {
      return (
        <div>
          <button onClick={handleReload}>Load</button>
          <NoContentComponent />
        </div>
      );
    }

    return (
      <div ref={ref} style={{ overflow: 'visible', height: 600, width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            '& infinite-scroll-component__outerdiv': {
              width: '100%',
            },
          }}
        >
          <InfiniteScroll
            // Note: We are using this component just for pull-to-refresh
            // No pagination is implemented
            // Pagination related props are stubs
            dataLength={cachedList.length}
            next={loadMore}
            hasMore={!noMore}
            loader={null}
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
              <InfiniteScrollHelper sx={{ mb: 2 }}>&#8593; Release to refresh</InfiniteScrollHelper>
            }
            scrollableTarget="root"
          >
            {cachedList.map((data) => (
              <Box key={data.id} sx={{ width: '100%', mt: 2, mb: 2 }}>
                {/* ListItemComponent({itemData}) */}
                <ListItemComponent data={data} />
              </Box>
            ))}
          </InfiniteScroll>
          {!noMore && (loadingMore ? <LoadingMoreComponent /> : <ScrollForMoreComponent />)}
          {noMore && <NoMoreComponent />}
        </Box>
      </div>
    );
  }, [
    cachedList,
    error,
    loading,
    loadingMore,
    noMore,
    loadMore,
    handleReload,
    ErrorComponent,
    ListItemComponent,
    LoadingComponent,
    LoadingMoreComponent,
    NoContentComponent,
    NoMoreComponent,
    ScrollForMoreComponent,
  ]);

  return (
    <Grid container>
      <button onClick={handleReload}>clear cache</button>
      <p>{cachedNextId}</p>
      {displayedData}
    </Grid>
  );
}
