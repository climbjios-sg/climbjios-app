import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { TimingModel } from '../../models/timing.model';

@Injectable()
export class TimingsDaoService {
  constructor(
    @Inject('TimingModel') private timingModel: ModelClass<TimingModel>,
  ) {}

  getAll() {
    return this.timingModel.query().select(['id', 'name']);
  }
}
