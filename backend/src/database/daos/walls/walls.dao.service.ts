import { WallModel } from '../../models/wall.model';
import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';

@Injectable()
export class WallsDaoService {
  constructor(@Inject('WallModel') private wallModel: ModelClass<WallModel>) {}

  getAll() {
    return this.wallModel.query().select(['id', 'name']);
  }
}
