import { UserRequest } from 'src/@types/user';

export type AvatarData = File & { preview: string };

export interface AvatarFormValues {
  avatar?: AvatarData;
}

export type OnboardingFormValues = UserRequest & AvatarFormValues;
