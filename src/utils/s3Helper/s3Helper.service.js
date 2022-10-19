"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3HelperService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const constants_service_1 = require("../constants/constants.service");
AWS.config.update({ region: process.env.AWS_REGION });
let S3HelperService = class S3HelperService {
    constructor(constantsService) {
        this.constantsService = constantsService;
        this.s3Instance = new AWS.S3();
    }
    generateUploadUrl(userId, uploadType) {
        return this.s3Instance.getSignedUrl('putObject', Object.assign(Object.assign({}, this.getBucketParams(userId, uploadType)), { ContentType: 'application/octet-stream' }));
    }
    getObjectUrl(userId, uploadType) {
        return this.s3Instance.getSignedUrl('getObject', this.getBucketParams(userId, uploadType));
    }
    getBucketParams(userId, postpendUploadType) {
        return {
            Bucket: this.constantsService.AWS_S3_BUCKET_NAME,
            Key: `${userId}/${postpendUploadType}`,
            Expires: 60,
        };
    }
};
S3HelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [constants_service_1.ConstantsService])
], S3HelperService);
exports.S3HelperService = S3HelperService;
//# sourceMappingURL=s3Helper.service.js.map