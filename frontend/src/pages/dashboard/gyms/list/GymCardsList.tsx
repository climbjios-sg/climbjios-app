import { Grid } from '@mui/material';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import GymCard from './GymCard';
import GrowableScroll, { FetchMoreItemsResult } from 'src/components/GrowableScroll';
import { dummyGymsList } from './dummy';
import { GymCardData } from './types/gymCard';

function moreItems(nextId?: string): Promise<FetchMoreItemsResult<GymCardData>> {
  const listSize = 3;
  const sliceStart = parseInt(nextId ?? '0');
  const sliceEnd = sliceStart + listSize;

  const slice = dummyGymsList.slice(sliceStart, sliceEnd);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: slice,
        nextId: sliceEnd >= dummyGymsList.length - 1 ? undefined : (sliceEnd).toString(),
      });
    }, 1000);
  });
}

export default function GymsCardList({ searchString }: { searchString: string }) {
  const LoadingComponent = (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <JioCardLoader />
    </Grid>
  );

  return (
    <GrowableScroll
      fetchMoreItemsCallback={moreItems}
      cacheName='GymCards'
      clearItems={false}
      reloadDeps={searchString}
      listItemComponent={GymCard}
      subComponents={{
        loadingComponent: LoadingComponent
      }}
    />
  );
}
