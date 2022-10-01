import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, Transaction } from 'objection';
import { PostModel } from '../../models/post.model';
import CreatePostDto from '../../../posts/dtos/createPost.dto';
import SearchPostDto from '../../../posts/dtos/searchPost.dto';

@Injectable()
export class PostsDaoService {
  constructor(@Inject('PostModel') private postModel: ModelClass<PostModel>) {}

  getUserPosts(userId: string) {
    return this.postModel
      .query()
      .select()
      .where('userId', userId)
      .orderBy('date', 'DESC')
      .withGraphFetched('[user,timings,gym]');
  }

  getById(postId: string, trx?: Transaction) {
    return this.postModel
      .query(trx)
      .findById(postId)
      .withGraphFetched('[user,timings,gym]');
  }

  create(
    post: Omit<CreatePostDto, 'timings'> & {
      userId: string;
      isClosed: boolean;
    },
    trx: Transaction,
  ) {
    return this.postModel.query(trx).insert(post).returning('*');
  }

  patchById(
    id: string,
    data: Partial<Omit<PostModel, 'timings'>>,
    trx: Transaction,
  ) {
    return this.postModel
      .query(trx)
      .patch(data)
      .findById(id)
      .returning('*')
      .withGraphFetched('[user,timings,gym]');
  }

  async getUpcomingPosts(search: SearchPostDto) {
    let query = this.postModel
      .query()
      .where('date', '>=', new Date(Date.now()).toISOString())
      .orderBy('date', 'DESC')
      .orderBy('gymId', 'ASC')
      .withGraphFetched('timings');

    // No filters set
    if (!Object.keys(search).length) {
      return await query;
    }

    Object.entries(search).forEach(([key, value]) => {
      if (['numPasses'].includes(key)) {
        query.where(key, '>=', value);
      } else if (key === 'timings') {
        // skip
      } else if (key === 'isBuyer') {
        // Buyers search for !isBuy posts and vice versa
        query.where('isBuy', !value);
      } else {
        query.where(key, value);
      }
    });

    const res = await query;
    if (!search.timings) {
      return res;
    }

    // keep results with at least 1 timing that is found in search timings
    return res.filter((x) =>
      x.timings.reduce(
        (acc, t) => acc || search.timings.includes(t.name),
        false,
      ),
    );
  }
}
