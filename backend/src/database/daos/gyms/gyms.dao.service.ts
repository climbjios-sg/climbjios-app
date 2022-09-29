import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { GymModel } from 'src/database/models/gym.model';

@Injectable()
export class GymsDaoService {
  constructor(@Inject('GymModel') private gymModel: ModelClass<GymModel>) {}

  getAll() {
    return this.gymModel.query().select(['id', 'name', 'permanentlyClosed']);
  }
}
