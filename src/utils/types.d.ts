export type JwtPayload = {
    id: string;
};
export declare enum AuthProvider {
    GOOGLE = "google",
    TELEGRAM = "telegram"
}
export declare enum PostType {
    BUYER = "buyer",
    SELLER = "seller",
    OTHER = "other"
}
export declare enum PostStatus {
    OPEN = "open",
    CLOSED = "closed",
    EXPIRED = "expired"
}
export declare enum S3UploadType {
    PROFILE_PICTURE = "profile_picture",
    BANNER_PICTURE = "banner_picture",
    ICON_PICTURE = "icon_picture"
}
