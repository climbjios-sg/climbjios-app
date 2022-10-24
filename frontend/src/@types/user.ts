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
  bio: string;
  name: string;
  telegramHandle: string;
  height: number;
  reach: number;
  pronounId: number;
  highestBoulderingGradeId: number;
  highestTopRopeGradeId: number;
  highestLeadClimbingGradeId: number;
  sncsCertificationId: number;
  profilePictureUrl: string;
  createdAt: string;
  updatedAt: string;
  sncsCertification: Certification;
  pronoun: Pronoun;
  highestBoulderingGrade: Grade;
  highestTopRopeGrade: Grade;
  highestLeadClimbingGrade: Grade;
  favouriteGyms: Gym[];
}

export type UserRequest = Partial<User> & {
  favouriteGymIds?: Gym['id'][];
};
export type UserResponse = User;

export type AvatarData = File & { preview: string };

export interface AvatarFormValues {
  avatar?: AvatarData;
}

export type EditProfileFormValues = UserRequest & AvatarFormValues;
