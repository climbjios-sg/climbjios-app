import { BaseModel } from './base.model';
import { BoulderingGradeModel } from './boulderingGrade.model';
import { PronounModel } from './pronoun.model';
import { GymModel } from './gym.model';
import { LeadClimbingGradeModel } from './leadClimbingGrade.model';
import { SncsCertificationModel } from './sncsCertification.model';
import { TopRopeGradeModel } from './topRopeGrade.model';
import * as AWS from 'aws-sdk';
export declare class UserProfileModel extends BaseModel {
    static tableName: string;
    static s3Instance: AWS.S3;
    readonly userId: string;
    readonly name?: string;
    readonly telegramHandle?: string;
    readonly height?: number;
    readonly reach?: number;
    readonly pronounId?: number;
    readonly highestBoulderingGradeId?: number;
    readonly highestTopRopeGradeId?: number;
    readonly highestLeadClimbingGradeId?: number;
    readonly sncsCertificationId?: number;
    readonly pronoun?: PronounModel;
    readonly highestBoulderingGrade?: BoulderingGradeModel;
    readonly highestTopRopeGrade?: TopRopeGradeModel;
    readonly highestLeadClimbingGrade?: LeadClimbingGradeModel;
    readonly sncsCertification?: SncsCertificationModel;
    readonly favouriteGyms?: GymModel[];
    profilePictureUrl: string;
    static relationMappings: () => {
        pronoun: {
            relation: import("objection").RelationType;
            modelClass: typeof PronounModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        highestBoulderingGrade: {
            relation: import("objection").RelationType;
            modelClass: typeof BoulderingGradeModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        highestTopRopeGrade: {
            relation: import("objection").RelationType;
            modelClass: typeof TopRopeGradeModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        highestLeadClimbingGrade: {
            relation: import("objection").RelationType;
            modelClass: typeof LeadClimbingGradeModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        sncsCertification: {
            relation: import("objection").RelationType;
            modelClass: typeof SncsCertificationModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        favouriteGyms: {
            relation: import("objection").RelationType;
            modelClass: typeof GymModel;
            filter: (query: any) => any;
            join: {
                from: string;
                through: {
                    from: string;
                    to: string;
                };
                to: string;
            };
        };
    };
    $afterFind: (context: any) => void | Promise<any>;
}
