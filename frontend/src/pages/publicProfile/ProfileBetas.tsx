import useSafeRequest from '../../hooks/services/useSafeRequest';
import { getCreatorBetas } from '../../services/betas';
import { BETAS_PAGE_SIZE } from 'src/config';
import useErrorSnackbar from '../../hooks/useErrorSnackbar';
import BetasInfiniteScroll from '../../components/BetaInfiniteScroll';
import EmptyContent from '../../components/EmptyContent';
import NoContentGif from 'src/assets/no-content.gif';

interface ProfileBetasProps {
  creatorId: string;
}

export default function ProfileBetas({ creatorId }: ProfileBetasProps) {
  const errorSnackbar = useErrorSnackbar();
  const getTargetBetas = (page: number) =>
    getCreatorBetas(creatorId, {
      page,
      pageSize: BETAS_PAGE_SIZE,
    });

  const { loading, data, mutate } = useSafeRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Betas.');
    },
  });

  return (
    <BetasInfiniteScroll
      style={{ width: '95vw' }}
      loading={loading}
      data={data}
      onFetchPage={(newResponse) => {
        mutate((oldResponse) => {
          newResponse.data.data.results = [
            ...(oldResponse?.data.data.results || []),
            ...newResponse.data.data.results,
          ];
          return newResponse;
        });
      }}
      emptyContent={
        <EmptyContent title="No Betas yet">
          <img alt="No content" style={{ borderRadius: 20 }} src={NoContentGif} />
        </EmptyContent>
      }
      fetchPage={getTargetBetas}
    />
  );
}
