export interface Transform {
  /**
   * form data to input
   */
  input: (value: unknown) => unknown;
  /**
   * input to form data
   */
  output: (value: unknown) => unknown;
}

export const DEFAULT_TRANSFORM: Transform = {
  input: (value) => value,
  output: (value) => value,
};

export const SANITIZE_EMPTY_VALUE: Transform = {
  input: (value) => value,
  /**
   * Transforms empty string into undefined
   */
  output: (value) => {
    const isEmptyString = typeof value === 'string' && value === '';
    if (isEmptyString) {
      return undefined;
    }

    return value;
  },
};
