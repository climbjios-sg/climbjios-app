import { CustomFile } from '../components/upload';
import { Color } from './color';
import { Gym, GymGrade } from './gym';
import { Wall } from './wall';

// TODO: Fix and remove
export type BetaDemo = {
  imageUrl: string;
  color: string;
  grade: string;
  wall: string;
  gym: string;
  createdAt: Date;
};

export type Beta = {
  cloudflareVideoUid: string;
  gym: Gym;
  color: Color;
  wall: Wall;
  gymGrade: GymGrade;
};

export type BetaUploadUrlResponse = Pick<Beta, 'cloudflareVideoUid'> & {
  cloudflareUploadUrl: string;
};

export type CreateBetaRequest = Pick<Beta, 'cloudflareVideoUid'> & {
  gymId: Gym['id'];
  colorId: Color['id'];
  wallId: Wall['id'];
  gymGradeId: GymGrade['id'];
};

export type BetaCreateEditFormValues = {
  video: CustomFile | undefined | string;
} & Pick<CreateBetaRequest, 'gymId' | 'colorId' | 'wallId' | 'gymGradeId'>;
