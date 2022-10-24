import { styled } from '@mui/system';
import { TypographyProps, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListBetasResponse } from '../../@types/beta';
import { AxiosResponse } from 'axios';
import BetaCard from './BetaCard';
import BetaLoader from './BetaLoader';
import MyBetaCard from './MyBetaCard';

const StyledInfiniteScroll = styled(InfiniteScroll)({
  maxWidth: 600,
  width: '100vw',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 16,
  rowGap: 16,
  padding: '0 12px',
  '& > div:first-of-type': {
    gridColumn: 'span 2',
  },
});

const InfiniteScrollHelper = styled((props: TypographyProps) => (
  <Typography {...props} variant="h5" />
))({
  gridColumn: 'span 2',
  textAlign: 'center',
  justifySelf: 'center',
});

interface BetasInfiniteScrollProps {
  data: AxiosResponse<ListBetasResponse, any> | undefined;
  fetchPage: (page: number) => Promise<AxiosResponse<ListBetasResponse, any>>;
  onFetchPage: (newResponse: AxiosResponse<ListBetasResponse, any>) => void;
  emptyContent: React.ReactElement;
  loading: boolean;
  isMine?: boolean; // True iff beta are mine
  style?: React.CSSProperties;
}

export default function BetasInfiniteScroll({
  data,
  fetchPage,
  onFetchPage,
  emptyContent,
  loading,
  style,
  isMine,
}: BetasInfiniteScrollProps) {
  const betas = data?.data;
  const BetaCardComponent = isMine ? MyBetaCard : BetaCard;

  if (loading) {
    return <BetaLoader />;
  }

  return betas && betas.data.total > 0 ? (
    <StyledInfiniteScroll
      style={{ paddingBottom: 20, ...style}}
      dataLength={betas.metadata.pageSize * betas.metadata.currentPage + betas.data.total}
      next={async () => {
        const newResponse = await fetchPage(betas.metadata.currentPage + 1);
        onFetchPage(newResponse);
      }}
      hasMore={!betas.metadata.isLastPage}
      loader={<></>}
      endMessage={<InfiniteScrollHelper>That's all!</InfiniteScrollHelper>}
      refreshFunction={() => fetchPage(0)}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <InfiniteScrollHelper>&#8595; Pull down to refresh</InfiniteScrollHelper>
      }
      releaseToRefreshContent={
        <InfiniteScrollHelper>&#8593; Release to refresh</InfiniteScrollHelper>
      }
    >
      {betas.data.results.map((beta) => (
        <BetaCardComponent key={beta.id} data={beta} />
      ))}
    </StyledInfiniteScroll>
  ) : (
    emptyContent
  );
}
