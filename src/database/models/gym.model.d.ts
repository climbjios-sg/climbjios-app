import * as AWS from 'aws-sdk';
import { QueryContext } from 'objection';
import { BaseModel } from './base.model';
import { GymGroupModel } from './gymGroup.model';
import { PassModel } from './gymPass.model';
export declare class GymModel extends BaseModel {
    static tableName: string;
    static s3Instance: AWS.S3;
    readonly name: string;
    readonly shortName: string;
    readonly permanentlyClosed: boolean;
    readonly gymGroupId: number;
    readonly passGroupId: number;
    iconUrl: string;
    bannerUrl: string;
    readonly address: string;
    readonly area: string;
    readonly passSharing: string;
    readonly boulder: boolean;
    readonly autoBelay: boolean;
    readonly topRope: boolean;
    readonly lead: boolean;
    readonly socialUrl: string;
    openNow: string;
    operatingHours: string[];
    static relationMappings: () => {
        gymGroup: {
            relation: import("objection").RelationType;
            modelClass: typeof GymGroupModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
        passGroup: {
            relation: import("objection").RelationType;
            modelClass: typeof PassModel;
            filter: (query: any) => any;
            join: {
                from: string;
                to: string;
            };
        };
    };
    $afterFind: (context: QueryContext) => void | Promise<any>;
}
