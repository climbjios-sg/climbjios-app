export interface Gym {
  id: number;
  name: string;
  permanentlyClosed: boolean;
}

export interface GymGrade {
  id: number;
  name: string;
}

export type GymRequest = Partial<Gym>;

export type GymResponse = Gym;
