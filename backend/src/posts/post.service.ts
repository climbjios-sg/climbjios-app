import { HttpException, Injectable } from '@nestjs/common';
import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import PatchPostDto from './dtos/patchPost.dto';
import CreatePostDto from './dtos/createPost.dto';
import SearchPostDto from './dtos/searchPost.dto';
import { PostStatus, PostType } from '../utils/types';
import { TelegramService } from '../utils/telegram/telegram.service';
import { PostModel } from '../database/models/post.model';
import { ConstantsService } from '../utils/constants/constants.service';
import * as moment from 'moment';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postsDaoService: PostsDaoService,
    private readonly gymsDaoService: GymsDaoService,
    private readonly telegramService: TelegramService,
    private readonly constantsService: ConstantsService,
    private readonly loggerService: LoggerService,
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

    return this.postsDaoService
      .create({
        creatorId,
        ...body,
        status: PostStatus.OPEN,
      })
      .then((created) => {
        /**
         * Intentionally not using await here so that control goes back to the
         * frontend immediately after post is created, instead of waiting for
         * a roundtrip to Telegram servers.
         *
         * NOTE: We can improve this by setting up a queue service.
         */
        this.notifyMainGroupOnSuccessfulPost(created);
        return created;
      });
  }

  async getPost(postId: string) {
    const post = await this.postsDaoService.getById(postId);
    if (!post) {
      throw new HttpException('No such jio', 404);
    }

    return post;
  }

  async patchPost(userId: string, postId: string, body: PatchPostDto) {
    const post = await this.postsDaoService.getById(postId);
    if (post?.creatorId !== userId) {
      throw new HttpException('Forbidden', 403);
    }

    if ([PostStatus.CLOSED, PostStatus.EXPIRED].includes(post.status)) {
      throw new HttpException('Cannot patch closed or expired posts!', 400);
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

    // If post is closed, we would have thrown error 400 above as we do not
    // allow patching of closed or expired posts
    const isClosed = body.isClosed ?? post.isClosed;

    const data = {
      ...body,
      status: isClosed ? PostStatus.CLOSED : PostStatus.OPEN,
    };
    delete data.isClosed;

    return this.postsDaoService
      .patchById(postId, {
        ...data,
      })
      .then((obj) => {
        if (obj.status === PostStatus.CLOSED) {
          this.editTelegramMessage(obj);
        }
        return obj;
      });
  }

  searchPosts(query: SearchPostDto) {
    return this.postsDaoService.getUpcomingPosts(query);
  }

  /**
   * This method is to be called from the cronjob.
   *
   * Updates the status of all existing open posts that are expired to 'expired',
   * and also updates the corresponding Telegram messages.
   */
  updateExpiredOpenPosts() {
    return this.postsDaoService
      .getExpiredOpenPosts()
      .then((expiredPosts) =>
        Promise.all(
          expiredPosts.map((p) =>
            this.postsDaoService
              .patchById(p.id, { status: PostStatus.EXPIRED })
              .then((updated) => this.editTelegramMessage(updated)),
          ),
        ),
      );
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

  /**
   * Format and send the Telegram Alert to the main group when a post is
   * successfully created. Also updates the database with the message_id of the
   * Telegram message.
   */
  private notifyMainGroupOnSuccessfulPost(createdObj: PostModel) {
    return this.telegramService
      .sendViaOAuthBot(
        this.formatAlertMessage(createdObj),
        this.constantsService.TELEGRAM_MAIN_CHAT_GROUP_ID,
      )
      .then((res) =>
        this.postsDaoService.patchById(createdObj.id, {
          telegramAlertMessageId: res.data?.result?.message_id,
        }),
      );
  }

  private editTelegramMessage(obj: PostModel) {
    return this.telegramService
      .editViaOAuthBot(
        obj.telegramAlertMessageId,
        this.constantsService.TELEGRAM_MAIN_CHAT_GROUP_ID,
        this.formatAlertMessage(obj),
      )
      .catch((e) => {
        this.loggerService.log(e);
      });
  }

  private formatAlertMessage(obj: PostModel) {
    let header;
    switch (obj.type) {
      case PostType.BUYER:
        header = `Buying ${obj.numPasses} 🎟`;
        break;
      case PostType.SELLER:
        header = `Selling ${obj.numPasses} 🎟`;
        break;
      case PostType.OTHER:
        header = 'Looking for friends to climb with\n(No need 🎟️)';
        break;
      default:
        // Should not reach this case
        break;
    }
    header = `<b>${header}</b>\n\n`;

    const gym = `📍 ${obj.gym.name}\n`;
    const dateTime = `🗓 ${moment(obj.startDateTime).format(
      'ddd, D MMM YYYY, h:mma',
    )}-${moment(obj.endDateTime).format('h:mma')}\n`;
    const price = obj.type !== PostType.OTHER ? `💵 $${obj.price}/pass\n` : '';
    const openToClimbTogether = obj.openToClimbTogether
      ? `👋 Open to climb together\n`
      : '';
    const optionalNote = obj.optionalNote ? `💬 ${obj.optionalNote}\n` : '';
    const redirectLink = `${this.constantsService.CORS_ORIGIN}/jios/${obj.id}`;
    const redirectLinkMsg = `🔗 <a href='${redirectLink}'>${redirectLink}</a>\n`;

    let message =
      header +
      gym +
      dateTime +
      price +
      openToClimbTogether +
      optionalNote +
      redirectLinkMsg;

    if (obj.status === PostStatus.CLOSED) {
      message = `❌ <b>CLOSED</b>\n\n<s>${message}</s>`;
    } else if (obj.status === PostStatus.EXPIRED) {
      message = `❌ <b>EXPIRED</b>\n\n<s>${message}</s>`;
    }

    return message;
  }
}
