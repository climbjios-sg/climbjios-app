import { BoulderingGradesDaoService } from '../database/daos/boulderingGrades/boulderingGrades.dao.service';
export declare class BoulderingGradesService {
    private readonly boulderingGradesDaoService;
    constructor(boulderingGradesDaoService: BoulderingGradesDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/boulderingGrade.model").BoulderingGradeModel, import("../database/models/boulderingGrade.model").BoulderingGradeModel[]>;
}
