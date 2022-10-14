import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostsDaoService } from './database/daos/posts/posts.dao.service';
import { UserDaoService } from './database/daos/users/user.dao.service';
import { TelegramAlertsService } from './utils/telegramAlerts/telegramAlerts.service';

@Injectable()
export class AppService {
  constructor(
    private readonly telegramAlertsService: TelegramAlertsService,
    private readonly userDaoService: UserDaoService,
    private readonly postsDaoService: PostsDaoService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_3_HOURS)
  async telegramAlerts() {
    return this.telegramAlertsService.log({
      num_telegram_users: await this.userDaoService.getTelegramUserCount(),
      num_google_users: await this.userDaoService.getGoogleUserCount(),
      num_posts: await this.postsDaoService.getPostsCount(),
      num_open_posts: await this.postsDaoService.getOpenPostsCount(),
    });
  }
}
