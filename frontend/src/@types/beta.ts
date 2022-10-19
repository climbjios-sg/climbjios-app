export type Beta = {
  imageUrl: string;
  color: string;
  grade: string;
  wall: string;
  gym: string;
  createdAt: Date;
};

export type BetaUploadUrlData = {
  uploadUrl: string;
  uid: string;
};

export type BetaCreateData = {
  gymId: number;
  wallId: number;
  colorId: number;
  videoUid: string;
};
