import { ModelClass } from 'objection';
import { TopRopeGradeModel } from '../../../database/models/topRopeGrade.model';
export declare class TopRopeGradesDaoService {
    private topRopeGradeModel;
    constructor(topRopeGradeModel: ModelClass<TopRopeGradeModel>);
    getAll(): import("objection").QueryBuilder<TopRopeGradeModel, TopRopeGradeModel[]>;
    findById(id: number): import("objection").QueryBuilder<TopRopeGradeModel, TopRopeGradeModel>;
}
