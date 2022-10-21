export const isNumberArray = (value: unknown): value is number[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.some((v) => typeof v !== 'number')) {
    return false;
  }

  return true;
};
