"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3UploadType = exports.PostStatus = exports.PostType = exports.AuthProvider = void 0;
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["GOOGLE"] = "google";
    AuthProvider["TELEGRAM"] = "telegram";
})(AuthProvider = exports.AuthProvider || (exports.AuthProvider = {}));
var PostType;
(function (PostType) {
    PostType["BUYER"] = "buyer";
    PostType["SELLER"] = "seller";
    PostType["OTHER"] = "other";
})(PostType = exports.PostType || (exports.PostType = {}));
var PostStatus;
(function (PostStatus) {
    PostStatus["OPEN"] = "open";
    PostStatus["CLOSED"] = "closed";
    PostStatus["EXPIRED"] = "expired";
})(PostStatus = exports.PostStatus || (exports.PostStatus = {}));
var S3UploadType;
(function (S3UploadType) {
    S3UploadType["PROFILE_PICTURE"] = "profile_picture";
    S3UploadType["BANNER_PICTURE"] = "banner_picture";
    S3UploadType["ICON_PICTURE"] = "icon_picture";
})(S3UploadType = exports.S3UploadType || (exports.S3UploadType = {}));
//# sourceMappingURL=types.js.map