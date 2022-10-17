import { BoulderingGradesService } from './boulderingGrades.service';
export declare class BoulderingGradesController {
    private readonly boulderingGradesService;
    constructor(boulderingGradesService: BoulderingGradesService);
    getAll(): import("objection").QueryBuilder<import("../database/models/boulderingGrade.model").BoulderingGradeModel, import("../database/models/boulderingGrade.model").BoulderingGradeModel[]>;
}
