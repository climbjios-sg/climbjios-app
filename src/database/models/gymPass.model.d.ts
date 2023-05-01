import { BaseModel } from './base.model';
export declare class PassModel extends BaseModel {
    static tableName: string;
    readonly id: string;
    readonly passGroupId: number;
    readonly passName: string;
    readonly numberOfPasses: number;
    readonly price: number;
    readonly discountedPrice: number;
    readonly paymentFrequency: string;
    readonly initiationFee: number;
    readonly discountedInitiationFee: number;
    readonly freezingFee: number;
    readonly ageRestriction: string;
    readonly sharingPolicy: string;
    readonly timeRestriction: string;
    readonly validityPeriod: string;
    readonly infoUrl: string;
    readonly remarks: string;
}
