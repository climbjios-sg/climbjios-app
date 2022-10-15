export interface Gym {
  id: number;
  name: string;
  permanentlyClosed: boolean;
}

export type RequestGym = Partial<Gym>;
export type ResponseGym = Gym;
