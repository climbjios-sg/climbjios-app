import { BaseModel } from './base.model';
import { ColorModel } from './color.model';
import { GymModel } from './gym.model';
import { GymGradeModel } from './gymGrade.model';
import { UserProfileModel } from './userProfile.model';
import { WallModel } from './wall.model';
export declare class BetaModel extends BaseModel {
    static tableName: string;
    readonly creatorId: string;
    readonly gymId: number;
    readonly gymGradeId: number;
    readonly colorId: number;
    readonly wallId: number;
    readonly cloudflareVideoUid: string;
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
        color: {
            relation: import("objection").RelationType;
            modelClass: typeof ColorModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        wall: {
            relation: import("objection").RelationType;
            modelClass: typeof WallModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        gymGrade: {
            relation: import("objection").RelationType;
            modelClass: typeof GymGradeModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
    };
}
