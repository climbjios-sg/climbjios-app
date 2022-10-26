import React from 'react';
import { Beta } from '../../@types/beta';
import BetaCaseBase from './BetaCardBase';

// ----------------------------------------------------------------------

type Props = {
  data: Beta;
};

// Memoizing content since it will be rendered in a infinite list
const BetaCard = React.memo(({ data }: Props) => <BetaCaseBase data={data} />);

export default BetaCard;
