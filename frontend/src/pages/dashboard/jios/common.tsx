import { Jio } from 'src/@types/jio';

export function getPassesText(data: Jio) {
  if (data.type === 'seller') {
    return `Buying ${data.numPasses} passes`;
  } else if (data.type === 'buyer') {
    return `Selling ${data.numPasses} passes`;
  } else {
    return `No need passes. Just looking for friends to climb with.`;
  }
}
