import { OptionResponse } from '.';
import { GymPreviewData } from './gymData';

export interface GymGroup extends OptionResponse {
  id: number;
  name: string;
  iconUrl?: string;
  permanentlyClosed: boolean;
  gymOutlets: GymPreviewData[]
}

export type GymsSearchResponse = GymGroup[];
