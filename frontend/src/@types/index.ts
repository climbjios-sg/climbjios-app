export interface Option {
  value: string | number;
  label: string;
}

export interface OptionResponse<T = string> {
  id: number;
  name: T;
}
