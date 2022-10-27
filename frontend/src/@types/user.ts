import { Gym } from './gym';
import { BoulderingGrade } from './boulderingGrade';
import { TopRopeGrade } from './topRopeGrade';
import { LeadClimbingGrade } from './leadClimbingGrade';
import { SncsCertification } from './sncsCertification';
import { Pronoun } from './pronoun';

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
  sncsCertification?: SncsCertification | null;
  pronoun?: Pronoun | null;
  highestBoulderingGrade?: BoulderingGrade | null;
  highestTopRopeGrade?: TopRopeGrade | null;
  highestLeadClimbingGrade?: LeadClimbingGrade | null;
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
