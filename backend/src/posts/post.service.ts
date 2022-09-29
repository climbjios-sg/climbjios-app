import { HttpException, Injectable } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import PatchPostDto from './dtos/patchPost.dto';
import CreatePostDto from './dtos/createPost.dto';
import { TimingsDaoService } from '../database/daos/timings/timings.dao.service';
import { Model } from 'objection';
import { TimingPostDaoService } from '../database/daos/timing_post/timing_post.dao.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postsDaoService: PostsDaoService,
    private readonly gymsDaoService: GymsDaoService,
    private readonly timingsDaoService: TimingsDaoService,
    private readonly timingPostDaoService: TimingPostDaoService,
  ) {}

  getOwnPosts(userId: string) {
    return this.postsDaoService.getUserPosts(userId);
  }

  async createPost(userId: string, body: CreatePostDto) {
    const gym = await this.gymsDaoService.findById(body.gymId);
    if (!gym) {
      throw new HttpException('Invalid gym id!', 400);
    }

    const dbTimings = await this.timingsDaoService.getAll();
    const timingToIdMap = dbTimings.reduce((acc, t) => {
      acc[t.name] = t.id;
      return acc;
    }, {});
    const timingIds = body.timings.map((t) => timingToIdMap[t]);

    const filtered = { ...body };
    delete filtered.timings;

    return Model.transaction(async (trx) => {
      const post = await this.postsDaoService.create(
        {
          userId,
          ...filtered,
          isClosed: false,
        },
        trx,
      );
      await this.timingPostDaoService.insertMany(
        timingIds.map((t) => ({ postId: post.id, timingId: t })),
        trx,
      );
      return await this.postsDaoService.getById(post.id, trx);
    });
  }

  async patchPost(userId: string, postId: string, body: PatchPostDto) {
    const post = await this.postsDaoService.getById(postId);
    if (post.userId !== userId) {
      throw new HttpException('Forbidden', 403);
    }

    return Model.transaction(async (trx) => {
      if (body.timings) {
        const dbTimings = await this.timingsDaoService.getAll();
        const timingToIdMap = dbTimings.reduce((acc, t) => {
          acc[t.name] = t.id;
          return acc;
        }, {});
        const timingIds = body.timings?.map((t) => ({
          postId,
          timingId: timingToIdMap[t],
        }));

        await this.timingPostDaoService.deleteAll(postId, trx);
        await this.timingPostDaoService.insertMany(timingIds, trx);
      }

      const filtered = { ...body };
      delete filtered.timings;

      return this.postsDaoService.patchById(postId, filtered, trx);
    });
  }
}
