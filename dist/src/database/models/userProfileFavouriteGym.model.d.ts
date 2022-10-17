import { BaseModel } from './base.model';
export declare class UserProfileFavouriteGymModel extends BaseModel {
    static tableName: string;
    readonly userProfileId: string;
    readonly gymId: number;
}
