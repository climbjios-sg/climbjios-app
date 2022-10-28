import chroma from 'chroma-js';

export function displayBetaColor(color: string) {
  return color === 'All' ? `#ca97d4` : chroma(color).alpha(0.7).css();
}
