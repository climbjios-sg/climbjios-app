export type JwtPayload = { id: string };
export enum AuthProvider {
  GOOGLE = 'google',
  TELEGRAM = 'telegram',
}
export enum PostType {
  BUYER = 'buyer',
  SELLER = 'seller',
  OTHER = 'other',
}
export enum S3UploadType {
  PROFILE_PICTURE = 'profile_picture',
}
