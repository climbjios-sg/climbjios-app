import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { GymModel } from '../../../database/models/gym.model';
import { GymGroupModel } from 'src/database/models/gymGroup.model';
import { PassModel } from '../../models/gymPass.model';

@Injectable()
export class PassesDaoService {
  constructor(
    @Inject('GymModel') private gymModel: ModelClass<GymModel>,
    @Inject('GymGroupModel') private gymGroupModel: ModelClass<GymGroupModel>,
    @Inject('PassModel') private passModel: ModelClass<PassModel>,
  ) {}

  async findByGymId(id: number) {
    const { passGroupId: gymPassGroupId, gymGroupId } = await this.gymModel
      .query()
      .findById(id)
      .select(['passGroupId', 'gymGroupId']);
    const { passGroupId: gymGroupPassGroupId } = await this.gymGroupModel
      .query()
      .findById(gymGroupId)
      .select(['passGroupId']);
    return {
      gymOutletPasses: await this.passModel
        .query()
        .where('passGroupId', '=', gymPassGroupId),
      gymGroupPasses: await this.passModel
        .query()
        .where('passGroupId', '=', gymGroupPassGroupId),
    };
  }
}
