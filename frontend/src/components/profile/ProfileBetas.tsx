import useSafeRequest from '../../hooks/services/useSafeRequest';
import { BETAS_PAGE_SIZE } from 'src/config';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import BetasInfiniteScroll from '../betas/BetaInfiniteScroll';
import EmptyContent from '../EmptyContent';
import NoContentGif from 'src/assets/no-content.gif';
import { useSelector } from '../../store';
import Image from '../Image';
import useGetCreatorBetas from '../../hooks/services/useGetCreatorBetas';

interface ProfileBetasProps {
  style?: React.CSSProperties;
  isMine?: boolean; // True iff is my profile
  creatorId: string;
}

export default function ProfileBetas({ style, creatorId, isMine = false }: ProfileBetasProps) {
  const errorSnackbar = useCustomSnackbar();
  const viewVersion = useSelector((state) => state.ui.viewVersion);
  const getCreatorBetas = useGetCreatorBetas({ isMine });
  const getTargetBetas = (page: number) =>
    getCreatorBetas(creatorId, {
      page,
      pageSize: BETAS_PAGE_SIZE,
    });

  const { loading, data, mutate, refresh } = useSafeRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueError('Failed to get Betas.');
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
      refresh={refresh}
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
          <Image alt="No content" style={{ borderRadius: 20, marginTop: 8 }} src={NoContentGif} />
        </EmptyContent>
      }
      fetchPage={getTargetBetas}
    />
  );
}
