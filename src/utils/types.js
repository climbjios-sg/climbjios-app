"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3UploadType = exports.PostType = exports.AuthProvider = void 0;
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
var S3UploadType;
(function (S3UploadType) {
    S3UploadType["PROFILE_PICTURE"] = "profile_picture";
})(S3UploadType = exports.S3UploadType || (exports.S3UploadType = {}));
//# sourceMappingURL=types.js.map