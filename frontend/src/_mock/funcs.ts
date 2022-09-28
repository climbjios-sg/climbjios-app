// ----------------------------------------------------------------------

export function randomNumber(number: number) {
  return Math.floor(Math.random() * number) + 1;
}

export function randomNumberRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomInArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
