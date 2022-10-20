import { PaginationResponseMetadata, PaginationRequestData } from './pagination';
import { CustomFile } from '../components/upload';
import { Color } from './color';
import { Gym, GymGrade } from './gym';
import { User } from './user';
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

export type BetaCreatorProfile = Pick<
  User,
  'userId' | 'name' | 'telegramHandle' | 'profilePictureUrl'
>;

export type Beta = {
  id: string;
  cloudflareVideoUid: string;
  gym: Gym;
  color: Color;
  wall: Wall;
  gymGrade: GymGrade;
  creatorProfile: BetaCreatorProfile;
};

export type ListBetasRequest = {
  gymId?: number;
  gymGradeId?: number;
  wallId?: number;
  colorId?: number;
} & PaginationRequestData;

export type ListBetasResponse = {
  data: {
    results: Beta[];
    total: number;
  };
  metadata: PaginationResponseMetadata;
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
