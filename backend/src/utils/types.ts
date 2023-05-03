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
export enum PostStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  EXPIRED = 'expired',
}
export enum S3UploadType {
  PROFILE_PICTURE = 'profile_picture',
  BANNER_PICTURE = 'banner_picture',
  ICON_PICTURE = 'icon_picture',
}
