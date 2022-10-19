import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { BetaModel } from '../../models/beta.model';
import CreateBetaDto from '../../../betas/dtos/createBeta.dto';

@Injectable()
export class BetasDaoService {
  constructor(@Inject('BetaModel') private betaModel: ModelClass<BetaModel>) {}

  create(
    beta: CreateBetaDto & {
      creatorId: string;
    },
  ) {
    return this.betaModel.query().insert(beta).returning('*');
  }
}
