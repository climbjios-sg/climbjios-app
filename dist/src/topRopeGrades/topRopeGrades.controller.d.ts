import { TopRopeGradesService } from './topRopeGrades.service';
export declare class TopRopeGradesController {
    private readonly topRopeGradesService;
    constructor(topRopeGradesService: TopRopeGradesService);
    getAll(): import("objection").QueryBuilder<import("../database/models/topRopeGrade.model").TopRopeGradeModel, import("../database/models/topRopeGrade.model").TopRopeGradeModel[]>;
}
