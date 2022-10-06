import { Jio } from '../../../@types/jio';

export function getPassesText(data: Jio) {
  if (data.jioType === 'seller') {
    return `Buying ${data.numPasses} passes`;
  } else if (data.jioType === 'buyer') {
    return `Selling ${data.numPasses} passes`;
  } else {
    return `No need passes. Just looking for friends to climb with.`;
  }
}
