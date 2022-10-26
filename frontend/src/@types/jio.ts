import { Gym } from './gym';
import { User } from './user';

type JioType = 'seller' | 'buyer' | 'other';

export interface Jio {
  id: number;
  creatorId: string;
  gymId: number;
  createdAt: string;
  updatedAt: string;
  openToClimbTogether: boolean;
  isClosed: boolean;
  startDateTime: string;
  endDateTime: string;
  type: JioType;
  gym: Gym;
  numPasses: number;
  optionalNote: string | null;
  price: number | null;
  creatorProfile: User;
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
  /**
   * Get jios that end after this date string.
   * DateTime string in ISO 8601 format
   */
  startDateTime?: string;
  /**
   * Get jios that end before this date string.
   * DateTime string in ISO 8601 format
   */
  endDateTime?: string;
};
