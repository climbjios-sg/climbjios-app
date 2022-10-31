import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from '../utils/logger/logger.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import { UserDaoService } from '../database/daos/users/user.dao.service';
import { PostService } from '../posts/post.service';

@Injectable()
export class CronjobService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly userDaoService: UserDaoService,
    private readonly postService: PostService,
    private readonly postsDaoService: PostsDaoService,
  ) {}

  @Cron(CronExpression.EVERY_3_HOURS)
  async metricAlerts() {
    return this.loggerService.log({
      num_telegram_users: await this.userDaoService.getTelegramUserCount(),
      num_posts: await this.postsDaoService.getPostsCount(),
      num_open_posts: await this.postsDaoService.getOpenPostsCount(),
    });
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  closeOutdatedPosts() {
    return this.postService.updateExpiredOpenPosts();
  }
}
