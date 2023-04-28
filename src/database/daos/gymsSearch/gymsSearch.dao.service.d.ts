import { ModelClass } from 'objection';
import { GymGroupModel } from '../../../database/models/gymGroup.model';
import { GymModel } from '../../models/gym.model';
export declare class GymsSearchDaoService {
    private gymGroupModel;
    private gymModel;
    constructor(gymGroupModel: ModelClass<GymGroupModel>, gymModel: ModelClass<GymModel>);
    searchGyms(substring?: string): Promise<{
        gymOutlets: GymModel[];
        name: string;
        permanentlyClosed: boolean;
        passGroupId: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        $modelClass: ModelClass<GymGroupModel>;
        QueryBuilderType: import("objection").QueryBuilder<GymGroupModel, GymGroupModel[]>;
    }[]>;
}
