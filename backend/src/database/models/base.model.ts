import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number | string;
  createdAt: Date;
  updatedAt: Date;

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
