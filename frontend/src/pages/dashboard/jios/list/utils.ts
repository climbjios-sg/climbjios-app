import { Jio } from 'src/@types/jio';

function pluralS(num: number) {
  return num > 1 ? 'es' : '';
}

export function getPassesText(data: Jio) {
  if (data.type === 'seller') {
    return `Selling ${data.numPasses}`;
  } else if (data.type === 'buyer') {
    return `Buying ${data.numPasses}`;
  } else {
    return ``;
  }
}
