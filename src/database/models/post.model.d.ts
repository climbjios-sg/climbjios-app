import { PostStatus, PostType } from '../../utils/types';
import { BaseModel } from './base.model';
import { GymModel } from './gym.model';
import { UserProfileModel } from './userProfile.model';
export declare class PostModel extends BaseModel {
    static tableName: string;
    readonly creatorId: string;
    readonly type: PostType;
    readonly numPasses: number;
    readonly price: number;
    readonly gymId: number;
    readonly startDateTime: Date;
    readonly endDateTime: Date;
    readonly openToClimbTogether: boolean;
    readonly optionalNote: string;
    readonly status: PostStatus;
    readonly telegramAlertMessageId: number;
    readonly creatorProfile: UserProfileModel;
    readonly gym: GymModel;
    isClosed: boolean;
    static relationMappings: () => {
        creatorProfile: {
            relation: import("objection").RelationType;
            modelClass: typeof UserProfileModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        gym: {
            relation: import("objection").RelationType;
            modelClass: typeof GymModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
    };
    $afterFind: (context: any) => void | Promise<any>;
}
