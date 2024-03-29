import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { GymModel } from '../../models/gym.model';

@Injectable()
export class GymsDaoService {
  constructor(@Inject('GymModel') private gymModel: ModelClass<GymModel>) {}

  getAll() {
    return this.gymModel
      .query()
      .context({ getUrls: false })
      .where('permanentlyClosed', '=', false)
      .select(['id', 'name'])
      .orderBy('name', 'ASC');
  }

  findByGymId(id: number) {
    // had to explicitly pass true for getUrls after changing to Yarn 1x
    return this.gymModel.query().context({ getUrls: true }).findById(id);
  }
}
