import { PostsDaoService } from './database/daos/posts/posts.dao.service';
import { UserDaoService } from './database/daos/users/user.dao.service';
import { TelegramAlertsService } from './utils/telegramAlerts/telegramAlerts.service';
export declare class AppService {
    private readonly telegramAlertsService;
    private readonly userDaoService;
    private readonly postsDaoService;
    constructor(telegramAlertsService: TelegramAlertsService, userDaoService: UserDaoService, postsDaoService: PostsDaoService);
    getHello(): string;
    telegramAlerts(): Promise<void>;
}
