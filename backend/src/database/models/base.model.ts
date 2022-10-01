import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: string;
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
