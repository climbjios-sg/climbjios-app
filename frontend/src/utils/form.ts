import { ChangeEvent } from 'react';

export interface Transform {
  input: (value: unknown) => unknown;
  output: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => unknown;
}

export const DEFAULT_TRANSFORM: Transform = {
  // input: (value) => (typeof value === 'number' && value === 0 ? '' : value),
  input: (value) => value,
  output: (e) => e.target.value,
};

export const OPTIONAL_TRANSFORM: Transform = {
  input: (value: unknown) => value,
  output: (e) => {
    const { value } = e.target;

    const isEmptyString = typeof value === 'string' && value === '';
    if (isEmptyString) {
      return undefined;
    }

    return value;
  },
};
