import { ModelClass } from 'objection';
import { GymModel } from '../../models/gym.model';
export declare class GymsDaoService {
    private gymModel;
    constructor(gymModel: ModelClass<GymModel>);
    getAll(): import("objection").QueryBuilder<GymModel, GymModel[]>;
    findByGymId(id: number): import("objection").QueryBuilder<GymModel, GymModel>;
}
