import { Grid } from '@mui/material';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import GymCard from './GymCard';
import CustomInfiniteScroll, { FetchMoreItemsResult } from 'src/components/CustomInfiniteScroll';
import { dummyGymsList } from './dummy';
import { GymCardData } from './types/gymCard';

function moreItems(nextId?: string): Promise<FetchMoreItemsResult<GymCardData>> {
  console.log('===MORE ITEMS=== nextId: '+nextId?.toString())

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
  const LoadingComponent = () => (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <JioCardLoader />
    </Grid>
  );

  return (
    <CustomInfiniteScroll
      fetchMoreItemsCallback={moreItems}
      reloadDeps={searchString}
      listItemComponent={GymCard}
      subComponents={{
        loadingComponent: LoadingComponent
      }}
    />
  );
}