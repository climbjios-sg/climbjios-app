import { Jio } from 'src/@types/jio';

function pluralS(num: number) {
  return num > 1 ? 'es' : '';
}

export function getPassesText(data: Jio) {
  if (data.type === 'seller') {
    return `Buying ${data.numPasses} pass${pluralS(data.numPasses)}`;
  } else if (data.type === 'buyer') {
    return `Selling ${data.numPasses} pass${pluralS(data.numPasses)}`;
  } else {
    return `No need passes. Just looking for friends to climb with.`;
  }
}
