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
  const renderCounter = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  console.log(
    '----------------------------------------------------render: ' +
      renderCounter.current.toString()
  );

  const ref = useRef(null);
  // const ref = useRef<HTMLDivElement>(null);
  const firstUpdate = useRef(true);
  const fetchCount = useRef(0);
  const shouldLoadMoreAgain = useRef(false)

  const [shouldReload, setShouldReload] = useState(false);

  const [error, setError] = useState<Error | undefined>(undefined);
  const [cachedList, setCachedList] = useSessionStorageState<(T & BasicListItem)[]>('test-list', {
    defaultValue: [],
  });
  const [cachedNextId, setCachedNextId] = useSessionStorageState<string | undefined>('test-id', {
    defaultValue: undefined,
  });

  // const sessionStorageGet = (value: string | null) => {
  //   console.log('value: ');
  //   console.log(value);
  //   if (value === 'undefined') {
  //     return undefined;
  //   } else if (value) {
  //     return JSON.parse(value);
  //   } else {
  //     return undefined;
  //   }
  // };

  // const cachedList = sessionStorageGet(sessionStorage.getItem('test-list'));
  // const setCachedList = useCallback((list: (T & BasicListItem)[]) => {
  //   sessionStorage.setItem('test-list', JSON.stringify(list));
  // }, []);
  // const cachedNextId = sessionStorageGet(sessionStorage.getItem('test-nextId'));
  // const setCachedNextId = useCallback((nextId: string | undefined) => {
  //   sessionStorage.setItem('test-nextId', JSON.stringify(nextId));
  // }, []);

  console.log('cached list: ');
  console.log(cachedList.toString());
  console.log('cachedNextId: ');
  console.log(cachedNextId);

  const { data, loading, reload, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      fetchCount.current = fetchCount.current + 1;
      const nId = d ? d.nextId : cachedNextId;
      console.log('run useInfiniteScroll');
      if (d) {
        console.log('use nextId from d');
      } else if (cachedNextId) {
        console.log('use nextId from cache');
        console.log('cachedNextId: ' + cachedNextId ?? 'undefined');
      } else {
        console.log('use undefined');
      }
      // console.log('d.nextId: ' + d ? d?.nextId : 'undefined');
      // console.log('cachedNextId: ' + cachedNextId ?? 'undefined');
      console.log('nId: ' + nId ?? 'undefined');
      //on first fetch, is cachedList is avail, return Promise of cached list so useInfiniteScroll knows of the cached list
      //since you are scrolling down, and there is a nextId, it will trigger another loadMore
      if (fetchCount.current === 1) {
        if (cachedList.length !== 0) {
          shouldLoadMoreAgain.current = true
          return new Promise<FetchMoreItemsResult<BasicListItem & T>>((resolve) => {
            resolve({ list: cachedList, nextId: cachedNextId });
          });
        }
      }

      // if (fetchCount.current === 2) {
      //   console.log('is second fetch');
      //   return fetchMoreItemsCallback(nId).then((value) => {
      //     value.list = concat(cachedList, value.list);
      //     console.log('full fetch result: ' + value.toString());
      //     return value;
      //   });
      // } else {
      //   return fetchMoreItemsCallback(nId);
      // }
      return fetchMoreItemsCallback(nId);
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
        if (fetchCount.current === 0) {
          if (cachedNextId === undefined) {
            console.log('isNoMore true');
            return true;
          } else {
            console.log('isNoMore false');
            return false;
          }
        } else if (d?.nextId === undefined) {
          console.log('isNoMore true');
          return true;
        } else {
          console.log('isNoMore false');
          return false;
        }
      },
      onSuccess: (data) => {
        console.log('===ON SUCESS===');
        console.log(data);
        setCachedNextId(data.nextId);
        if (shouldLoadMoreAgain.current) {
          shouldLoadMoreAgain.current = false
          loadMore()
        } else {

        setCachedList(concat(cachedList, data.list));
        }
      },
      onError: (e) => {
        console.log('error: ');
        console.log(e);
        setError(e);
      },
      // reloadDeps: [reloadDeps],
      manual: true,
    }
  );

  if (shouldReload) {
    setShouldReload(false);
    reload();
  }

  console.log('data: ');
  console.log(data);

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

    //on first render, check for cached list, if empty, call reload to load new data
    if (firstUpdate.current) {
      console.log('is firstUpdate');
      if (cachedList.length === 0) {
        console.log('cachedList empty, call initial load');
        handleReload();
      } else {
        console.log('cached list avail, use it');
        itemsList = cachedList;
      }
      //if not first render, don't use cached list
    } else {
      itemsList = data ? data.list : [];
    }

    // itemsList = cachedList

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
            dataLength={itemsList.length}
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
