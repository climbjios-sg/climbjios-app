import { ChangeEvent } from 'react';

export interface Transform {
  /**
   * form data to input
   */
  input: (value: unknown) => unknown;
  /**
   * input to form data
   */
  output: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => unknown;
}

export const DEFAULT_TRANSFORM: Transform = {
  input: (value) => value,
  output: (e) => e.target.value,
};

export const SANITIZE_EMPTY_VALUE: Transform = {
  input: (value: unknown) => value,
  /**
   * Transforms empty string into undefined
   */
  output: (e) => {
    const { value } = e.target;

    const isEmptyString = typeof value === 'string' && value === '';
    if (isEmptyString) {
      return undefined;
    }

    return value;
  },
};
