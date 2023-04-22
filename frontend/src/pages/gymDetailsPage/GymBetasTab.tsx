import useSafeRequest from '../../hooks/services/useSafeRequest';
import { BETAS_PAGE_SIZE } from 'src/config';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import BetasInfiniteScroll from '../../components/betas/BetaInfiniteScroll';
import EmptyContent from '../../components/EmptyContent';
import NoContentGif from 'src/assets/no-content.gif';
import { useSelector } from '../../store';
import Image from '../../components/Image';
import { ListBetasRequest } from 'src/@types/beta';
import { useCallback } from 'react';
import { getBetas } from 'src/services/betas';

interface GymBetasProps {
  style?: React.CSSProperties;
  gymId: number;
}

export default function GymBetas({ style, gymId }: GymBetasProps) {
  const errorSnackbar = useCustomSnackbar();
  const viewVersion = useSelector((state) => state.ui.viewVersion);

  const getTargetBetas = useCallback(
    (page: number) => {
      const request: ListBetasRequest = {
        page,
        pageSize: BETAS_PAGE_SIZE,
      };
      request.gymId = gymId;

      return getBetas(request);
    },
    [gymId]
  );

  const { loading, data, mutate, refresh } = useSafeRequest(() => getTargetBetas(0), {
    onError: () => {
      errorSnackbar.enqueueError('Failed to get Betas.');
    },
    refreshDeps: [viewVersion],
  });

  return (
    <BetasInfiniteScroll
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
