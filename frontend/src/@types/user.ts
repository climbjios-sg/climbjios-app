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
  hasProfilePicture?: boolean | null;
  name?: string | null;
  profilePictureUrl?: string | null;
  bio?: string | null;
  height?: number | null;
  reach?: number | null;
  sncsCertification?: Certification | null;
  pronoun?: Pronoun | null;
  highestBoulderingGrade?: Grade | null;
  highestTopRopeGrade?: Grade | null;
  highestLeadClimbingGrade?: Grade | null;
  favouriteGyms?: Gym[] | null;
  pronounId?: number | null;
  highestBoulderingGradeId?: number | null;
  highestTopRopeGradeId?: number | null;
  highestLeadClimbingGradeId?: number | null;
  sncsCertificationId?: number | null;
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
