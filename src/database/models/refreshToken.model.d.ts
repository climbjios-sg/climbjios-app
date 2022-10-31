import { BaseModel } from './base.model';
export declare class RefreshTokenModel extends BaseModel {
    static tableName: string;
    readonly userId: string;
    readonly refreshToken: string;
}
