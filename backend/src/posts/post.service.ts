import { HttpException, Injectable } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import PatchPostDto from './dtos/patchPost.dto';
import CreatePostDto from './dtos/createPost.dto';
import SearchPostDto from './dtos/searchPost.dto';
import { PostType } from '../utils/types';

@Injectable()
export class PostService {
  constructor(
    private readonly postsDaoService: PostsDaoService,
    private readonly gymsDaoService: GymsDaoService,
  ) {}

  getOwnPosts(userId: string) {
    return this.postsDaoService.getUserPosts(userId);
  }

  async createPost(creatorId: string, body: CreatePostDto) {
    /**
     * Pre-condition: DTO already checks that
     * - startDateTime and endDateTime fall on the same day
     * - startDateTime is before endDateTime
     * - both dates are after `new Date()`
     *  */

    this.checkPostTypeAndNumPasses(body.type, body.numPasses);

    const gym = await this.gymsDaoService.findById(body.gymId);
    if (!gym) {
      throw new HttpException('Invalid gym id!', 400);
    }

    return this.postsDaoService.create({
      creatorId,
      ...body,
      isClosed: false,
    });
  }

  async getPost(userId: string, postId: string) {
    const post = await this.postsDaoService.getById(postId);
    if (post.creatorId !== userId) {
      throw new HttpException('Forbidden', 403);
    }

    return post;
  }

  async patchPost(userId: string, postId: string, body: PatchPostDto) {
    const post = await this.postsDaoService.getById(postId);
    if (post.creatorId !== userId) {
      throw new HttpException('Forbidden', 403);
    }

    const postType = body.type ?? post.type;
    const numPasses = body.numPasses ?? post.numPasses;
    this.checkPostTypeAndNumPasses(postType, numPasses);

    const startDateTime = new Date(body.startDateTime ?? post.startDateTime);
    const endDateTime = new Date(body.endDateTime ?? post.endDateTime);

    if (startDateTime.toDateString() !== endDateTime.toDateString()) {
      // both start and end datetimes must be on same day
      return new HttpException(
        'startDateTime and endDateTime should fall on the same day!',
        400,
      );
    } else if (startDateTime > endDateTime) {
      // start comes before end datetime
      return new HttpException(
        'startDateTime should be before endDateTime!',
        400,
      );
    }

    return this.postsDaoService.patchById(postId, {
      ...body,
    });
  }

  searchPosts(query: SearchPostDto) {
    return this.postsDaoService.getUpcomingPosts(query);
  }

  private checkPostTypeAndNumPasses(type: PostType, numPasses: number) {
    if ([PostType.BUYER, PostType.SELLER].includes(type) && numPasses === 0) {
      throw new HttpException('numPasses should be at least 1!', 400);
    }
    if (PostType.OTHER === type && numPasses !== 0) {
      throw new HttpException(
        "'other' type must have numPasses equals 0!",
        400,
      );
    }
  }
}
