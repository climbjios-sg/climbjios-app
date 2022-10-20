import { GymGradeModel } from './../../models/gymGrade.model';
import { ModelClass } from 'objection';
export declare class GymGradesDaoService {
    private gymGradeModel;
    constructor(gymGradeModel: ModelClass<GymGradeModel>);
    findByGymId(gymId: number): import("objection").QueryBuilder<GymGradeModel, GymGradeModel[]>;
}
