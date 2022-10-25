import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BetaModel } from '../../models/beta.model';
import CreateBetaDto from '../../../betas/dtos/createBeta.dto';
import { GetBetasQuery } from '../../../betas/dtos/getBetas.dto';
import { UserProfileDaoService } from '../userProfiles/userProfile.dao.service';

type CreateBetaQuery = CreateBetaDto & {
  creatorId: string;
};

@Injectable()
export class BetasDaoService {
  static allGraphs = `[gym,color,wall,gymGrade,creatorProfile.${UserProfileDaoService.allGraphs}]`;

  constructor(@Inject('BetaModel') private betaModel: ModelClass<BetaModel>) {}

  create(beta: CreateBetaQuery) {
    return this.betaModel.query().insert(beta).returning('*');
  }

  private buildGetQuery(args: GetBetasQuery) {
    let query = this.betaModel.query();
    if (args.gymId !== undefined) {
      query = query.where('gymId', args.gymId);
    }
    if (args.colorId !== undefined) {
      query = query.where('colorId', args.colorId);
    }
    if (args.gymGradeId !== undefined) {
      query = query.where('gymGradeId', args.gymGradeId);
    }
    if (args.wallId !== undefined) {
      query = query.where('wallId', args.wallId);
    }
    if (args.creatorId !== undefined) {
      query = query.where('creatorId', args.creatorId);
    }
    return query;
  }

  getAll(args: GetBetasQuery) {
    let query = this.buildGetQuery(args);

    if (args.limit !== undefined) {
      query = query.limit(args.limit);
    }

    return query
      .withGraphFetched(BetasDaoService.allGraphs)
      .orderBy('createdAt', 'DESC')
      .page(args.page, args.pageSize);
  }

  deleteById(betaId: string) {
    return this.betaModel.query().delete().findById(betaId);
  }

  getById(betaId: string) {
    return this.betaModel.query().findById(betaId);
  }

  async getCount(args: GetBetasQuery) {
    const countArr = await this.buildGetQuery(args).count({ count: '*' });
    // NOTE: count would be a string if is larger than size of an integer, but it's unlikely in our business scenario
    return countArr['count'] as number;
  }
}
