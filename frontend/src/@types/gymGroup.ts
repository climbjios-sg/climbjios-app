import { OptionResponse } from '.';
import { GymData } from './gymData';

export interface GymGroup extends OptionResponse {
  name: string;
  permanentlyClosed: boolean;
  outlets: GymData[]
}

export type GymGroupRequest = Partial<GymGroup>;

export type GymsSearchResponse = GymGroup[];
