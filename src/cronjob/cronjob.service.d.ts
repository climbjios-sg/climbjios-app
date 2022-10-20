import { PostsDaoService } from '../database/daos/posts/posts.dao.service';
import { UserDaoService } from '../database/daos/users/user.dao.service';
import { TelegramAlertsService } from '../utils/telegramAlerts/telegramAlerts.service';
export declare class CronjobService {
    private readonly telegramAlertsService;
    private readonly userDaoService;
    private readonly postsDaoService;
    constructor(telegramAlertsService: TelegramAlertsService, userDaoService: UserDaoService, postsDaoService: PostsDaoService);
    telegramAlerts(): Promise<void>;
    closeOutdatedPosts(): import("objection").QueryBuilder<import("../database/models/post.model").PostModel, number>;
}
