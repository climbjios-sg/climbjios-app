import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConstantsService } from '../constants/constants.service';
import { S3UploadType } from '../types';

AWS.config.update({ region: process.env.AWS_REGION });

@Injectable()
export class S3HelperService {
  private s3Instance = new AWS.S3();

  constructor(private readonly constantsService: ConstantsService) {}

  public generateUploadUrl(userId: string, uploadType: S3UploadType) {
    return this.s3Instance.getSignedUrl('putObject', {
      ...this.getBucketParams(userId, uploadType),
      ContentType: 'application/octet-stream',
    });
  }

  public getObjectUrl(userId: string, uploadType: S3UploadType) {
    return this.s3Instance.getSignedUrl(
      'getObject',
      this.getBucketParams(userId, uploadType),
    );
  }

  private getBucketParams(userId: string, postpendUploadType: string) {
    return {
      Bucket: this.constantsService.AWS_S3_BUCKET_NAME,
      Key: `${userId}/${postpendUploadType}`,
      Expires: 60, // 1 minute
    };
  }
}
