import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, Transaction } from 'objection';
import { PostModel } from 'src/database/models/post.model';
import CreatePostDto from 'src/posts/dtos/createPost.dto';

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
}
