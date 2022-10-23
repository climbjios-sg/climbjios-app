import { Jio } from 'src/@types/jio';

export function getPassesText(data: Jio) {
  if (data.type === 'seller') {
    return `Selling ${data.numPasses}`;
  } else if (data.type === 'buyer') {
    return `Buying ${data.numPasses}`;
  } else {
    return `No need`;
  }
}
