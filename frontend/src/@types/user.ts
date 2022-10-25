import { Gym } from './gym';

export enum PronounName {
  HeHim = 'He/Him',
  SheHer = 'She/Her',
  TheyThem = 'They/Them',
  PreferNotToSay = 'Prefer not to say',
}

interface Pronoun {
  id: number;
  name: PronounName;
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
  hasProfilePicture?: boolean;
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

export type AvatarData = File & { preview: string };

export interface AvatarFormValues {
  avatar?: AvatarData;
}

export type EditProfileFormValues = UserRequest & AvatarFormValues;
