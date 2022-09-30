import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, Transaction } from 'objection';
import { TimingPostModel } from '../../models/timing_post.model';

@Injectable()
export class TimingPostDaoService {
  constructor(
    @Inject('TimingPostModel')
    private timingPostModel: ModelClass<TimingPostModel>,
  ) {}

  insertMany(data: Partial<TimingPostModel>[], trx: Transaction) {
    return this.timingPostModel.query(trx).insertGraph(data).returning('*');
  }

  deleteAll(postId: string, trx: Transaction) {
    return this.timingPostModel.query(trx).delete().where('postId', postId);
  }
}
