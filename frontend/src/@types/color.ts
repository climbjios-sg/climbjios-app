import { OptionResponse } from '.';

export enum ColorName {
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Teal = 'Teal',
  Blue = 'Blue',
  Purple = 'Purple',
  Pink = 'Pink',
  Black = 'Black',
  White = 'White',
  Brown = 'Brown',
}

export interface Color extends OptionResponse<ColorName> {}
