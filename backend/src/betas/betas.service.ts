import { BetasDaoService } from './../database/daos/betas/betas.dao.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConstantsService } from '../utils/constants/constants.service';
import CreateBetaDto from './dtos/createBeta.dto';
import GetBetasDto, { GetBetasQuery } from './dtos/getBetas.dto';

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

  private async getBetasHelper(query: GetBetasQuery) {
    try {
      // If page is not defined it will be set to zero
      if (query.page === undefined) {
        query.page = 0;
      }

      // If page size is not defined it will be set to 10
      if (!query.pageSize) {
        query.pageSize = 10;
      }

      const data = await this.betaDaoService.getAll(query);
      const count = await this.betaDaoService.getCount(query);
      const currentPage = query.page;
      const totalPages = Math.ceil(count / query.pageSize);
      return {
        data,
        metadata: {
          totalCount: count,
          currentPage,
          pageSize: query.pageSize,
          totalPages,
          isLastPage: totalPages === currentPage,
        },
      };
    } catch (err) {
      console.error('Get beta failed', err);
      throw new HttpException('Failed', 500);
    }
  }

  async getCreatorBetas(creatorId: string, query: GetBetasDto) {
    return this.getBetasHelper({ ...query, creatorId });
  }

  async getBetas(query: GetBetasDto) {
    return this.getBetasHelper(query);
  }

  async deleteBeta(creatorId: string, betaId: string) {
    const beta = await this.betaDaoService.getById(betaId);
    if (beta.creatorId !== creatorId) {
      throw new HttpException('Forbidden', 403);
    }

    return this.betaDaoService.deleteById(betaId);
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
