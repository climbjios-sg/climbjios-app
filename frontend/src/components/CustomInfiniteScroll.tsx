import { useMemo, useRef, useState } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteScroll, useSessionStorageState } from 'ahooks';

import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import * as Defaults from './CustomInfiniteScrollDefaults';
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

  const renderCounter = useRef(0);

  renderCounter.current = renderCounter.current + 1;

  console.log('render:' + renderCounter.current.toString());

  const ref = useRef(null);
  const firstUpdate = useRef(true);

  // const ref = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [cachedList, setCachedList] = useSessionStorageState<(T & BasicListItem)[]>('test-list', {
    defaultValue: [],
  });
  const [cachedNextId, setCachedNextId] = useSessionStorageState<string | undefined>('test-id', {
    defaultValue: undefined,
  });

  console.log(cachedNextId?.toString());

  const { data, loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => fetchMoreItemsCallback(d ? d.nextId : cachedNextId ?? undefined),
    // (d) => fetchMoreItemsCallback(d?.nextId),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined && cachedNextId === undefined,
      onError: (e) => setError(e),
      reloadDeps: [reloadDeps],
      manual: true,
    }
  );

  const displayedData = useMemo(() => {
    let itemsList: (T & BasicListItem)[] = [];

    if (firstUpdate.current) {
      firstUpdate.current = false;
      if (cachedList.length === 0) {
        console.log('initial load');
        reload();
      } else {
        itemsList = cachedList;
      }
    } else {
      itemsList = data?.list ?? [];
      // setCachedNextId(data?.nextId);
    }
    setCachedNextId(data?.nextId);
    console.log('itemsList: ' + itemsList.toString());

    setCachedList(itemsList);

    console.log('after setCachedList');

    if (error) {
      return <ErrorComponent />;
    }

    if (loading) {
      return <LoadingComponent />;
    }

    if (itemsList.length === 0) {
      return (
        <div>
          <button onClick={reload}>Load</button>
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
            dataLength={itemsList.length}
            next={loadMore}
            hasMore={!noMore}
            loader={null}
            // Pull to refresh props
            pullDownToRefresh
            refreshFunction={reload}
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
            {itemsList.map((data) => (
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
    data,
    error,
    loading,
    loadingMore,
    noMore,
    loadMore,
    reload,
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
      <button
        onClick={() => {
          setCachedList([]);
          setCachedNextId(undefined);
        }}
      >
        clear cache
      </button>
      {displayedData}
    </Grid>
  );
}
