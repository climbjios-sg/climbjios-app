import { useEffect, useMemo, useRef, useState } from 'react';
import { Grid, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  const renderCounter = useRef(0);

  renderCounter.current = renderCounter.current + 1;

  console.log('render: ' + renderCounter.current.toString());

  const ref = useRef(null);
  const firstUpdate = useRef(true);
  const firstFetch = useRef(true);

  // const ref = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [cachedList, setCachedList] = useSessionStorageState<(T & BasicListItem)[]>('test-list', {
    defaultValue: [],
  });
  const [cachedNextId, setCachedNextId] = useSessionStorageState<string | undefined>('test-id', {
    defaultValue: undefined,
  });

  console.log('cached list: ');
  console.log(cachedList.toString());
  console.log('cachedNextId: ');
  console.log(cachedNextId?.toString());

  const { data, loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      const nId = d ? d.nextId : cachedNextId;
      console.log('run useInfiniteScroll: nId: ' + (nId ? nId.toString() : 'undefined'));
      if (firstFetch.current) {
        console.log('is firstFetch');
        firstFetch.current = false;
        return fetchMoreItemsCallback(nId).then((value) => {
          setCachedNextId(value.nextId);
          value.list = concat(cachedList, value.list);
          console.log('full fetch result: ' + value.toString());
          return value;
        });
      } else {
        return fetchMoreItemsCallback(nId).then((value) => {
          setCachedNextId(value.nextId);
          return value;
        });
      }
    },
    // (d) => fetchMoreItemsCallback(d?.nextId),
    {
      target: ref,
      isNoMore: (d) => {
        console.log('check isNoMore');
        console.log('d: ');
        console.log(d);
        console.log('cachedNextId: ');
        console.log(cachedNextId);
        return d?.nextId === undefined && cachedNextId === undefined;
      },
      onError: (e) => {
        console.log('error: ');
        console.log(e);
        setError(e);
      },
      reloadDeps: [reloadDeps],
      manual: true,
    }
  );

  console.log('data: ');
  console.log(data);

  useEffect(() => {
    if (data) {
      setCachedNextId(data?.nextId);
      // console.log('itemsList: ' + itemsList.toString());

      setCachedList(data ? data.list : []);

      console.log('-setCachedList-');
      console.log('data: ');
      console.log(data);
    }
    // console.log('cachedList: ')
    // console.log(cachedList)
  }, [data, setCachedList, setCachedNextId]);

  const displayedData = useMemo(() => {
    console.log('--------useMemo--------');
    let itemsList: (T & BasicListItem)[] = [];
    // if (firstUpdate.current) {
    //   console.log('is firstUpdate')
    //   firstUpdate.current = false;
    //   if (cachedList.length === 0) {
    //     console.log('cachedList empty, call initial load')
    //     reload();
    //   } else {
    //     console.log('cachedList not empty, use it')
    //     itemsList = cachedList;
    //   }
    // } else {
    //   console.log('not firstUpdate')
    //   itemsList = data?.list ?? [];
    //   // setCachedNextId(data?.nextId);
    // }

    if (firstUpdate.current) {
      console.log('is firstUpdate');
      firstUpdate.current = false;
      if (cachedList.length === 0) {
        console.log('cachedList empty, call initial load');
        reload();
      }
    }

    if (cachedList.length > 0) {
      console.log('cached list avail, use it');
      itemsList = cachedList;
    } else {
      console.log('no cached list, use data');
      itemsList = data ? data.list : [];
    }

    console.log('itemsList: ');
    console.log(itemsList);

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
    // itemsList,
    cachedList,
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
