import { LeadClimbingGradesDaoService } from '../database/daos/leadClimbingGrades/leadClimbingGrades.dao.service';
export declare class LeadClimbingGradesService {
    private readonly leadClimbingGradesDaoService;
    constructor(leadClimbingGradesDaoService: LeadClimbingGradesDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/leadClimbingGrade.model").LeadClimbingGradeModel, import("../database/models/leadClimbingGrade.model").LeadClimbingGradeModel[]>;
}
