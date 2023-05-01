import { ModelClass } from 'objection';
import { GymModel } from '../../../database/models/gym.model';
import { GymGroupModel } from 'src/database/models/gymGroup.model';
import { PassModel } from '../../models/gymPass.model';
export declare class PassesDaoService {
    private gymModel;
    private gymGroupModel;
    private passModel;
    constructor(gymModel: ModelClass<GymModel>, gymGroupModel: ModelClass<GymGroupModel>, passModel: ModelClass<PassModel>);
    findByGymId(id: number): Promise<{
        gymOutletPasses: PassModel[];
        gymGroupPasses: PassModel[];
    }>;
}
