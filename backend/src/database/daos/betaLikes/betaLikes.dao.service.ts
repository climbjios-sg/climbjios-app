import { BetaLikeModel } from './../../models/betaLike.model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';

@Injectable()
export class BetaLikesDaoService {
  constructor(
    @Inject('BetaLikeModel') private betaLikeModel: ModelClass<BetaLikeModel>,
  ) {}

  create(betaId: string, userId: string) {
    return this.betaLikeModel
      .query()
      .insert({
        betaId,
        userId,
      })
      .returning('*');
  }
}
