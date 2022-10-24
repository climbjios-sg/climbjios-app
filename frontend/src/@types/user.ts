import { Gym } from './gym';

interface Pronoun {
  id: number;
  name: string;
}

interface Grade {
  id: number;
  name: string;
}

interface Certification {
  id: number;
  name: string;
}

export interface User {
  userId: string;
  telegramHandle: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  profilePictureUrl?: string;
  bio?: string;
  height?: number;
  reach?: number;
  sncsCertification?: Certification;
  pronoun?: Pronoun;
  highestBoulderingGrade?: Grade;
  highestTopRopeGrade?: Grade;
  highestLeadClimbingGrade?: Grade;
  favouriteGyms?: Gym[];
  pronounId?: number;
  highestBoulderingGradeId?: number;
  highestTopRopeGradeId?: number;
  highestLeadClimbingGradeId?: number;
  sncsCertificationId?: number;
}

export type UserRequest = Partial<User> & {
  favouriteGymIds?: Gym['id'][];
};
export type UserResponse = User;
