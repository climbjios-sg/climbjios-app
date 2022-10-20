import { TopRopeGradesDaoService } from '../database/daos/topRopeGrades/topRopeGrades.dao.service';
export declare class TopRopeGradesService {
    private readonly topRopeGradesDaoService;
    constructor(topRopeGradesDaoService: TopRopeGradesDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/topRopeGrade.model").TopRopeGradeModel, import("../database/models/topRopeGrade.model").TopRopeGradeModel[]>;
}
