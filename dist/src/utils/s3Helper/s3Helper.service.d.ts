import { ConstantsService } from '../constants/constants.service';
import { S3UploadType } from '../types';
export declare class S3HelperService {
    private readonly constantsService;
    private s3Instance;
    constructor(constantsService: ConstantsService);
    generateUploadUrl(userId: string, uploadType: S3UploadType): string;
    getObjectUrl(userId: string, uploadType: S3UploadType): string;
    private getBucketParams;
}
