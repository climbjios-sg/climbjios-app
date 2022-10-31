import { OptionResponse } from '.';

export enum WallName {
  Vertical = 'Vertical',
  Overhang = 'Overhang',
  Slab = 'Slab',
}

export interface Wall extends OptionResponse<WallName> {}
