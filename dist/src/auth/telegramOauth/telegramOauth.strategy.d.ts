import { TelegramStrategy as Strategy } from 'passport-telegram-official';
import { VerifiedCallback } from 'passport-jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
declare const TelegramOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class TelegramOauthStrategy extends TelegramOauthStrategy_base {
    private readonly userDaoService;
    static NO_USERNAME: string;
    constructor(constantsService: ConstantsService, userDaoService: UserDaoService);
    validate(profile: any, done: VerifiedCallback): Promise<void>;
}
export {};
