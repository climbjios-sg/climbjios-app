import { BaseModel } from './base.model';
import { GymModel } from './gym.model';
export declare class GymGroupModel extends BaseModel {
    static tableName: string;
    readonly name: string;
    readonly permanentlyClosed: boolean;
    readonly passGroupId: number;
    static relationMappings: () => {
        gymOutlets: {
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
