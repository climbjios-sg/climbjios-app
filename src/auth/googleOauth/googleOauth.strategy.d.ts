import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
declare const GoogleOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleOauthStrategy extends GoogleOauthStrategy_base {
    private readonly userDaoService;
    constructor(constantsService: ConstantsService, userDaoService: UserDaoService);
    validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifiedCallback): Promise<void>;
}
export {};
