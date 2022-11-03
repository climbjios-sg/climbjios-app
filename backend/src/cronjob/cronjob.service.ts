import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from '../utils/logger/logger.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import { UserDaoService } from '../database/daos/users/user.dao.service';
import { PostService } from '../posts/post.service';
import { RefreshTokensDaoService } from '../database/daos/refreshTokens/refreshTokens.dao.service';

@Injectable()
export class CronjobService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly userDaoService: UserDaoService,
    private readonly postService: PostService,
    private readonly postsDaoService: PostsDaoService,
    private readonly refreshTokensDaoService: RefreshTokensDaoService,
  ) {}

  @Cron(CronExpression.EVERY_3_HOURS)
  async metricAlerts() {
    return this.loggerService.log({
      num_telegram_users: await this.userDaoService.getTelegramUserCount(),
      num_open_posts: await this.postsDaoService.getOpenPostsCount(),
      num_closed_posts: await this.postsDaoService.getClosedPostsCount(),
      num_expired_posts: await this.postsDaoService.getExpiredOpenPosts(),
    });
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  closeOutdatedPosts() {
    return this.postService.updateExpiredOpenPosts();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  cleanUpExpiredRefreshTokens() {
    return this.refreshTokensDaoService.deleteExpired();
  }
}
