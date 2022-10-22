import { BaseModel } from './base.model';
export declare class GymModel extends BaseModel {
    static tableName: string;
    readonly name: string;
    readonly permanentlyClosed: boolean;
}