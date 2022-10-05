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
      .orderBy('endDateTime', 'DESC')
      .withGraphFetched('[user,gym]');
  }

  getById(postId: string, trx?: Transaction) {
    return this.postModel
      .query(trx)
      .findById(postId)
      .withGraphFetched('[user,gym]');
  }

  create(
    post: CreatePostDto & {
      userId: string;
      isClosed: boolean;
    },
  ) {
    return this.postModel.query().insert(post).returning('*');
  }

  patchById(id: string, data: Partial<PostModel>) {
    return this.postModel
      .query()
      .patch(data)
      .findById(id)
      .returning('*')
      .withGraphFetched('[user,gym]');
  }

  async getUpcomingPosts(search: SearchPostDto) {
    const query = this.postModel
      .query()
      .orderBy('startDateTime', 'ASC')
      .orderBy('endDateTime', 'ASC')
      .orderBy('gymId', 'ASC')
      .withGraphFetched('[gym,user]');

    // No filters set
    if (!Object.keys(search).length) {
      return await query.where('endDateTime', '>=', new Date());
    }
    Object.entries(search).forEach(([key, value]) => {
      if (['numPasses'].includes(key)) {
        query.where(key, '>=', value);
      } else if (key === 'startDateTime') {
        // Intervals Problem:
        // where startDateTime is before endDateTime of post
        query.where('endDateTime', '>=', new Date(value));
      } else if (key === 'endDateTime') {
        // where endDateTime is after startDateTime of post
        query.where('startDateTime', '<=', new Date(value));
      } else if (key === 'isBuyer') {
        query.where('isBuy', !value);
      } else {
        query.where(key, value);
      }
    });
    return await query;
  }
}
