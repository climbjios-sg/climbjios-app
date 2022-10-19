import { LeadClimbingGradesService } from './leadClimbingGrades.service';
export declare class LeadClimbingGradesController {
    private readonly leadClimbingGradesService;
    constructor(leadClimbingGradesService: LeadClimbingGradesService);
    getAll(): import("objection").QueryBuilder<import("../database/models/leadClimbingGrade.model").LeadClimbingGradeModel, import("../database/models/leadClimbingGrade.model").LeadClimbingGradeModel[]>;
}
