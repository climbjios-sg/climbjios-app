import { Gym } from './gym';
import { User } from './user';

export interface Jio {
  id: number;
  type: 'seller' | 'buyer' | 'other';
  numPasses: number;
  price: number;
  gymId: number;
  startDateTime: string;
  endDateTime: string;
  openToClimbTogether: boolean;
  optionalNote: string;
  createdAt: string;
  updatedAt: string;
  isClosed: boolean;
  user: User;
  gym: Gym;
}

// Generic request and response types

export type JioRequest = Pick<
  Jio,
  | 'type'
  | 'numPasses'
  | 'price'
  | 'gymId'
  | 'startDateTime'
  | 'endDateTime'
  | 'openToClimbTogether'
  | 'optionalNote'
>;
export type JioResponse = Jio;

// Specific request and response types

export type GetJioListRequest = Partial<Pick<Jio, 'type' | 'numPasses' | 'gymId'>> & {
  // Get jios that end after this date string.
  // DateTime string in ISO 8601 format
  startDateTime?: string;
  // Get jios that end before this date string.
  // DateTime string in ISO 8601 format
  endDateTime?: string;
};
