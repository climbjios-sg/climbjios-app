import { ModelClass } from 'objection';
import { BoulderingGradeModel } from '../../../database/models/boulderingGrade.model';
export declare class BoulderingGradesDaoService {
    private boulderingGradeModel;
    constructor(boulderingGradeModel: ModelClass<BoulderingGradeModel>);
    getAll(): import("objection").QueryBuilder<BoulderingGradeModel, BoulderingGradeModel[]>;
    findById(id: number): import("objection").QueryBuilder<BoulderingGradeModel, BoulderingGradeModel>;
}
