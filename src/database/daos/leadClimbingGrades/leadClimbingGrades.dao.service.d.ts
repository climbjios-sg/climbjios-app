import { ModelClass } from 'objection';
import { LeadClimbingGradeModel } from '../../../database/models/leadClimbingGrade.model';
export declare class LeadClimbingGradesDaoService {
    private leadClimbingGradeModel;
    constructor(leadClimbingGradeModel: ModelClass<LeadClimbingGradeModel>);
    getAll(): import("objection").QueryBuilder<LeadClimbingGradeModel, LeadClimbingGradeModel[]>;
    findById(id: number): import("objection").QueryBuilder<LeadClimbingGradeModel, LeadClimbingGradeModel>;
}
