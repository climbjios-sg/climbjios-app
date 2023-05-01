import { OptionResponse } from '.';
import { GymPreviewData } from './gymDetails';

export interface GymGroup extends OptionResponse {
  id: number;
  name: string;
  iconUrl?: string;
  permanentlyClosed: boolean;
  gymOutlets: GymPreviewData[]
}

export type GymsSearchResponse = GymGroup[];
