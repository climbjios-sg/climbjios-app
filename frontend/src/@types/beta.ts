import { PaginationRequestData, PaginationResponse } from './pagination';
import { CustomFile } from '../components/upload';
import { Color } from './color';
import { Gym, GymGrade } from './gym';
import { User } from './user';
import { Wall } from './wall';

export type Beta = {
  id: string;
  cloudflareVideoUid: string;
  thumbnailUrl: string;
  gym: Gym;
  color: Color;
  wall: Wall;
  gymGrade: GymGrade;
  creatorProfile: User;
  createdAt: string;
  updatedAt: string;
  videoUrl?: string;
};

// Map of Beta ID -> Beta Video URL
export type LocalBetaVideos = {
  [betaId: string]: string;
};

export type ListBetasRequest = {
  gymId?: number;
  gymGradeId?: number;
  wallId?: number;
  colorId?: number;
} & PaginationRequestData;

export type ListBetasResponse = PaginationResponse<Beta>;

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
