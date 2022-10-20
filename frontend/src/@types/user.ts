import { Gym } from './gym';

interface Pronoun {
  id: number;
  name: string;
}

interface Grade {
  id: number;
  name: string;
}

export interface User {
  userId: string;
  name: string;
  telegramHandle: string;
  height: number;
  reach: number;
  pronounId: number;
  highestBoulderingGradeId: number;
  highestTopRopeGradeId: number;
  highestLeadClimbingGradeId: string;
  sncsCertificationId: string;
  profilePictureUrl: string;
  createdAt: string;
  updatedAt: string;
  highestLeadClimbingGrade: string;
  sncsCertification: string;
  pronoun: Pronoun;
  highestBoulderingGrade: Grade;
  highestTopRopeGrade: Grade;
  favouriteGyms: Gym[];
}

export type UserRequest = Partial<User> & {
  favouriteGymIds?: Gym['id'][];
};
export type UserResponse = User;
