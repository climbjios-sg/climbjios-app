import { BaseModel } from './base.model';

export class TimingPostModel extends BaseModel {
  static tableName = 'timing_post';

  timingId: string;
  postId: string;
}
