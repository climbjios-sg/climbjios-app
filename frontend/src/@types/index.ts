export interface Option<T = string | number> {
  value: T;
  label: string;
}

export interface OptionResponse<T = string> {
  id: number;
  name: T;
}
