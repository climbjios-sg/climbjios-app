import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, Transaction } from 'objection';
import { PostModel } from '../../models/post.model';
import CreatePostDto from '../../../posts/dtos/createPost.dto';
import SearchPostDto from '../../../posts/dtos/searchPost.dto';
import { PostStatus, PostType } from '../../../utils/types';
import { UserProfileDaoService } from '../userProfiles/userProfile.dao.service';

@Injectable()
export class PostsDaoService {
  static allGraphs = `[creatorProfile.${UserProfileDaoService.allGraphs},gym]`;

  constructor(@Inject('PostModel') private postModel: ModelClass<PostModel>) {}

  getUserPosts(userId: string) {
    return this.postModel
      .query()
      .select()
      .where('creatorId', userId)
      .orderBy('endDateTime', 'DESC')
      .withGraphFetched(PostsDaoService.allGraphs);
  }

  getById(postId: string, trx?: Transaction) {
    return this.postModel
      .query(trx)
      .findById(postId)
      .withGraphFetched(PostsDaoService.allGraphs);
  }

  create(
    post: CreatePostDto & {
      creatorId: string;
      status: PostStatus.OPEN;
    },
  ) {
    return this.postModel
      .query()
      .insert(post)
      .returning('*')
      .withGraphFetched('gym');
  }

  patchById(id: string, data: Partial<PostModel>) {
    return this.postModel
      .query()
      .patch(data)
      .findById(id)
      .returning('*')
      .withGraphFetched(PostsDaoService.allGraphs);
  }

  async getUpcomingPosts(search: SearchPostDto) {
    const query = this.postModel
      .query()
      .orderBy('startDateTime', 'ASC')
      .orderBy('endDateTime', 'ASC')
      .orderBy('gymId', 'ASC')
      .withGraphFetched(PostsDaoService.allGraphs);

    query.where('status', PostStatus.OPEN);

    if (search.type) {
      query.where('type', search.type);
    }

    if (search.numPasses) {
      query.where('numPasses', '>=', search.numPasses);
    }

    if (search.gymId) {
      query.where('gymId', search.gymId);
    }

    // ---- Price filter ---
    if (search.price) {
      if (search.type === PostType.SELLER) {
        query.where('price', '>=', search.price);
      } else if (search.type === PostType.BUYER) {
        query.where('price', '<=', search.price);
      }
    }

    // ---- Date time filter ---
    // Always show posts with date = null (They belong to users who are selling their passes on anyday)
    // By default, search for posts after current date
    query
      .where('startDateTime', '>=', new Date())
      .orWhere('startDateTime', null);
    // Intervals Problem:
    // where startDateTime is before endDateTime of post
    if (search.startDateTime) {
      query
        .where('endDateTime', '>=', new Date(search.startDateTime))
        .orWhere('endDateTime', null);
    }
    if (search.endDateTime) {
      query
        .where('startDateTime', '<=', new Date(search.endDateTime))
        .orWhere('startDateTime', null);
    }
    // ---------------------------

    return await query;
  }

  deleteAllUserPosts(userId: string, trx: Transaction) {
    return this.postModel.query(trx).delete().where({ userId });
  }

  // Used only for metric alerts
  getOpenPostsCount() {
    return this.postModel
      .query()
      .count()
      .where({ status: PostStatus.OPEN })
      .first()
      .then((r: any) => r.count);
  }

  // Used only for metric alerts
  getExpiredPostsCount() {
    return this.postModel
      .query()
      .count()
      .where({ status: PostStatus.EXPIRED })
      .first()
      .then((r: any) => r.count);
  }

  // Used only for metric alerts
  getClosedPostsCount() {
    return this.postModel
      .query()
      .count()
      .where({ status: PostStatus.CLOSED })
      .first()
      .then((r: any) => r.count);
  }

  /**
   * So that cronjob can close them.
   */
  getExpiredOpenPosts() {
    return this.postModel
      .query()
      .select()
      .where('endDateTime', '<', new Date())
      .where('status', PostStatus.OPEN);
  }
}
