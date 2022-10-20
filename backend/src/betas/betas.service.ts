import { BetasDaoService } from './../database/daos/betas/betas.dao.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConstantsService } from '../utils/constants/constants.service';
import CreateBetaDto from './dtos/createBeta.dto';

@Injectable()
export class BetasService {
  constructor(
    private readonly constantsService: ConstantsService,
    private readonly httpService: HttpService,
    private readonly betaDaoService: BetasDaoService,
  ) {}

  async createBeta(creatorId: string, body: CreateBetaDto) {
    try {
      return await this.betaDaoService.create({
        creatorId,
        ...body,
      });
    } catch (err) {
      console.error('Create beta failed', err);
      throw new HttpException('Failed', 500);
    }
  }

  async getVideoUploadUrl() {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `https://api.cloudflare.com/client/v4/accounts/${this.constantsService.CLOUDFLARE_ACCOUNT_ID}/stream/direct_upload`,
          {
            // Limit max seconds of video to 60s
            maxDurationSeconds: 60,
          },
          {
            headers: {
              Authorization: `Bearer ${this.constantsService.CLOUDFLARE_STREAM_API_TOKEN}`,
            },
          },
        ),
      );
      if (!data.success) {
        console.error('Get video upload URL failed', JSON.stringify(data));
        throw new HttpException('Failed', 500);
      }

      return {
        cloudflareUploadUrl: data.result.uploadURL,
        cloudflareVideoUid: data.result.uid,
      };
    } catch (error) {
      console.error('Get video upload URL failed', JSON.stringify(error));
      throw new HttpException('Failed', 500);
    }
  }
}
