import { OptionResponse } from '.';

export interface Gym extends OptionResponse {
  shortName: string;
  permanentlyClosed: boolean;
}

export interface GymGrade extends OptionResponse {}

export type GymRequest = Partial<Gym>;

export type GymResponse = Gym;
