export interface Gym {
  id: number;
  name: string;
  permanentlyClosed: boolean;
}

export type GymRequest = Partial<Gym>;
export type GymResponse = Gym;
