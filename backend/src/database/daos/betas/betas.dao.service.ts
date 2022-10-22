import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BetaModel } from '../../models/beta.model';
import CreateBetaDto from '../../../betas/dtos/createBeta.dto';
import getBetasDto from '../../../betas/dtos/getBetas.dto';

@Injectable()
export class BetasDaoService {
  static allGraphs = '[gym,color,wall,gymGrade,creatorProfile]';

  constructor(@Inject('BetaModel') private betaModel: ModelClass<BetaModel>) {}

  create(
    beta: CreateBetaDto & {
      creatorId: string;
    },
  ) {
    return this.betaModel.query().insert(beta).returning('*');
  }

  private buildGetQuery(args: getBetasDto) {
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
    return query;
  }

  getAll(args: getBetasDto) {
    let query = this.buildGetQuery(args);

    if (args.limit !== undefined) {
      query = query.limit(args.limit);
    }

    console.log(query.toKnexQuery().toSQL());

    return query
      .withGraphFetched(BetasDaoService.allGraphs)
      .orderBy('createdAt', 'DESC')
      .page(args.page, args.pageSize);
  }

  async getCount(args: getBetasDto) {
    const countArr = await this.buildGetQuery(args).count({ count: '*' });
    // NOTE: count would be a string if is larger than size of an integer, but it's unlikely in our business scenario
    return countArr['count'] as number;
  }
}
