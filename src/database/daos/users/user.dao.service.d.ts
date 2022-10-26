import { ModelClass } from 'objection';
import { UserModel } from '../../models/user.model';
export declare class UserDaoService {
    private userModel;
    constructor(userModel: ModelClass<UserModel>);
    findById(userId: string, select?: string | string[]): import("objection").QueryBuilder<UserModel, UserModel>;
    updateById(userid: string, user: Partial<UserModel>): import("objection").QueryBuilder<UserModel, UserModel>;
    findOrCreateOAuthUser(user: Partial<UserModel>): Promise<UserModel>;
    getTelegramUserCount(): Promise<any>;
    getGoogleUserCount(): Promise<any>;
}
