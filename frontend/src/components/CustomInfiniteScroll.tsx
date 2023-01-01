import { useMemo, useRef } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteScroll } from 'ahooks';

import InfiniteScrollHelper from 'src/components/InfiniteScrollHelper';
import * as Defaults from './CustomInfiniteScrollDefaults';

export interface FetchMoreItemsResult<T> {
  list: T[];
  nextId?: string;
}

export interface ListItemComponentProps<T> {
  data: T;
}

interface BasicListItem {
  id: string;
}

export interface ListViewProps<T> {
  fetchMoreItemsCallback: (nextId?: string) => Promise<FetchMoreItemsResult<T & BasicListItem>>;
  reloadDeps: any;
  errorComponent?: React.ComponentType;
  loadingComponent?: React.ComponentType;
  noContentComponent?: React.ComponentType;
  // listItemComponent: ({ itemData }: ListItemComponentProps<T>) => React.ReactNode;
  listItemComponent: ({ data }: ListItemComponentProps<T>) => JSX.Element;
  // listItemComponent: React.ReactNode;
  noMoreComponent?: React.ComponentType;
  scrollForMoreComponent?: React.ComponentType;
  loadingMoreComponent?: React.ComponentType;
}

export default function CustomInfiniteScroll<T>({
  // scrollableParentRef,
  fetchMoreItemsCallback,
  reloadDeps = [],
  errorComponent: ErrorComponent = Defaults.ErrorComponent,
  loadingComponent: LoadingComponent = Defaults.LoadingComponent,
  noContentComponent: NoContentComponent = Defaults.NoContentComponent,
  listItemComponent: ListItemComponent = Defaults.ListItemComponent,
  noMoreComponent: NoMoreComponent = Defaults.NoMoreComponent,
  scrollForMoreComponent: ScrollForMoreComponent = Defaults.ScrollForMoreComponent,
  loadingMoreComponent: LoadingMoreComponent = Defaults.LoadingMoreComponent,
}: ListViewProps<T>) {
  const ref = useRef(null);
  // const ref = useRef<HTMLDivElement>(null);

  let error: any;
  const { data, loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
    // const { data, loading, reload, loadingMore, noMore } = useInfiniteScroll(
    (d) => fetchMoreItemsCallback(d?.nextId),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
      onError: (e) => {
        error = e;
      },
      reloadDeps: [reloadDeps]
    }
  );

  const displayedData = useMemo(() => {
    const itemsList = data?.list ?? [];

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