import { AuthProvider } from '../../utils/types';
import { BaseModel } from './base.model';
import { UserProfileModel } from './userProfile.model';
export declare class UserModel extends BaseModel {
    static tableName: string;
    readonly authProvider: AuthProvider;
    readonly authProviderId: string;
    readonly oauthName: string;
    readonly email?: string;
    readonly userProfile: UserProfileModel;
    static relationMappings: () => {
        userProfile: {
            relation: import("objection").RelationType;
            modelClass: typeof UserProfileModel;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
