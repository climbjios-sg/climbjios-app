import { BaseModel } from './base.model';
export declare class GymGradeModel extends BaseModel {
    static tableName: string;
    readonly name: string;
    readonly gymId: number;
    readonly order: number;
}
