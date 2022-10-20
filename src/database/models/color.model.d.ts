import { BaseModel } from './base.model';
export declare class ColorModel extends BaseModel {
    static tableName: string;
    readonly name: string;
    readonly order: number;
}
