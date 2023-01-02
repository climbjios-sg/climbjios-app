import { useMemo, useRef, useState } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteScroll, useRequest, useSessionStorageState } from 'ahooks';

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

  const ref = useRef(null);

  const firstUpdate = useRef(true);

  // const ref = useRef<HTMLDivElement>(null);

  // function useCustomInfiniteScroll<T extends Data>(
  //   service: Service<T>,
  //   options: InfiniteScrollOptions<T>
  // ) {
  //   return useInfiniteScroll(
  //     (d) =>
  //       useRequest(() => service(d?.nextId), {
  //         cacheKey: 'test',
  //         manual: true,
  //       }).runAsync(),
  //     {
  //       ...options,
  //     }
  //   );
  // }

  let error: any;

  // const [cachedList, setCachedList] = useSessionStorageState<T[]>('test', {
  //   defaultValue: [],
  // });

  // const [nextId, setNextId] = useState(undefined);

  const nextId = useRef(undefined);

  const { runAsync } = useRequest(() => fetchMoreItemsCallback(nextId.current), {
    cacheKey: 'test',
    staleTime: 1000*60*60*10,
    manual: true,
  });

  const { data, loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
    // (d) => fetchMoreItemsCallback(d?.nextId),
    (d) => {
      // setNextId(d?.nextId)
      nextId.current = d?.nextId;
      return runAsync();
    },
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
      onError: (e) => {
        error = e;
      },
      reloadDeps: [reloadDeps],
      // manual: true,
    }
  );

  // if (firstUpdate.current) {
  //   firstUpdate.current = false;
  //   if (cachedList.length === 0) {
  //     console.log('initial load');
  //     loadMore();
  //   }
  // }

  // const { data, loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
  //   (d) =>
  //     useRequest(() => fetchMoreItemsCallback(d?.nextId), {
  //       cacheKey: 'test',
  //       manual: true,
  //     }).runAsync(),
  //   {
  //     target: ref,
  //     isNoMore: (d) => d?.nextId === undefined,
  //     onError: (e) => {
  //       error = e;
  //     },
  //     reloadDeps: [reloadDeps],
  //   }
  // );

  // const { data, loading, reload, loadMore, loadingMore, noMore } = useCustomInfiniteScroll(
  //   (d) => fetchMoreItemsCallback(d?.nextId),
  //   {
  //     target: ref,
  //     isNoMore: (d) => d?.nextId === undefined,
  //     onError: (e) => {
  //       error = e;
  //     },
  //     reloadDeps: [reloadDeps],
  //   }
  // );

  const displayedData = useMemo(() => {
    const itemsList = data?.list ?? [];
    // setCachedList(itemsList);
    // loadMore();

    if (error) {
      return <ErrorComponent />;
    }

    if (loading) {
      return <LoadingComponent />;
    }

    if (itemsList.length === 0) {
      return <NoContentComponent />;
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

  return <Grid container>{displayedData}</Grid>;
}
