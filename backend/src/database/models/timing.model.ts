import { Timing } from '../../utils/types';
import { BaseModel } from './base.model';

export class TimingModel extends BaseModel {
  static tableName = 'timings';

  readonly name: Timing;
}
