import { Model } from 'objection';
export declare class BaseModel extends Model {
    readonly id: string;
    createdAt: Date;
    updatedAt: Date;
    $beforeInsert(): void;
    $beforeUpdate(): void;
}
