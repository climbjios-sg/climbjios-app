import useSafeRequest from '../../hooks/services/useSafeRequest';
import { getCreatorBetas } from '../../services/betas';
import { BETAS_PAGE_SIZE } from 'src/config';
import useErrorSnackbar from '../../hooks/useErrorSnackbar';
import BetasInfiniteScroll from '../betas/BetaInfiniteScroll';
import EmptyContent from '../EmptyContent';
import NoContentGif from 'src/assets/no-content.gif';
import { useSelector } from '../../store';

interface ProfileBetasProps {
  style?: React.CSSProperties;
  isMine?: boolean; // True iff is my profile
  creatorId: string;
}

export default function ProfileBetas({ style, creatorId, isMine }: ProfileBetasProps) {
  const errorSnackbar = useErrorSnackbar();
  const viewVersion = useSelector((state) => state.ui.viewVersion);
  const getTargetBetas = (page: number) =>
    getCreatorBetas(creatorId, {
      page,
      pageSize: BETAS_PAGE_SIZE,
    });

  const { loading, data, mutate } = useSafeRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Betas.');
    },
    refreshDeps: [viewVersion],
  });

  return (
    <BetasInfiniteScroll
      isMine={isMine}
      style={{
        width: '95vw',
        ...style,
      }}
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
