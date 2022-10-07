import { Gym } from './gym';
import { User } from './user';

// Jio represents a jio request
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
