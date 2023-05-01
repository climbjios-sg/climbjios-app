import { Grid } from '@mui/material';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import GymGroupCard from './GymGroupCard';
import GrowableScroll, { FetchMoreItemsResult } from 'src/components/GrowableScroll';
// import { dummyGymsList } from './dummy';
import { GymGroupCardData } from '../../../../@types/gymGroupCard';
import { searchGyms } from 'src/services/gyms';

export default function GymGroupCardsList({ searchString }: { searchString: string }) {
  async function moreItems(nextId?: string): Promise<FetchMoreItemsResult<GymGroupCardData>> {
    const gymsSearchResult = (await searchGyms(searchString)).data;

    const gymGroupList = gymsSearchResult.map((v) => {
      const gymOutletsList = v.gymOutlets.map((outlet) => ({
        ...outlet,
        id: outlet.id.toString(),
      }));
      return {
        ...v,
        id: v.id.toString(),
        gymOutlets: gymOutletsList,
      };
    });

    return { list: gymGroupList, nextId: undefined };

    // const listSize = 3;
    // const sliceStart = parseInt(nextId ?? '0');
    // const sliceEnd = sliceStart + listSize;

    // const slice = dummyGymsList.slice(sliceStart, sliceEnd);

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       list: slice,
    //       nextId: sliceEnd >= dummyGymsList.length - 1 ? undefined : sliceEnd.toString(),
    //     });
    //   }, 1000);
    // });
  }

  const LoadingComponent = (
    <Grid sx={{ width: '100%', mt: 2 }} item>
      <JioCardLoader />
    </Grid>
  );

  return (
    <GrowableScroll
      fetchMoreItemsCallback={moreItems}
      cacheName="GymCards"
      reloadDeps={searchString}
      listItemComponent={GymGroupCard}
      subComponents={{
        loadingComponent: LoadingComponent,
      }}
    />
  );
}
