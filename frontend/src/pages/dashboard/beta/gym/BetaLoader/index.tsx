import { Box, styled } from '@mui/material';
import BetaCardSkeleton from './BetaCardSkeleton';

const Container = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    rowGap: 10,
    width: '100vw',
    maxWidth: 600,
    columnGap: 10,
});

export default function BetaLoader() {
  return (
    <Container>
      <BetaCardSkeleton />
      <BetaCardSkeleton />
    </Container>
  );
}
