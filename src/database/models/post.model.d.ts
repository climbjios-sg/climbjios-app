import { PostType } from '../../utils/types';
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
    readonly isClosed: boolean;
    readonly creatorProfile: UserProfileModel;
    readonly gym: GymModel;
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
}
