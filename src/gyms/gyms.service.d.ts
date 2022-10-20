import { GymsDaoService } from 'src/database/daos/gyms/gyms.dao.service';
import { GymGradesDaoService } from 'src/database/daos/gymGrades/gymGrades.dao.service';
export declare class GymsService {
    private readonly gymsDaoService;
    private readonly gymGradesDaoService;
    constructor(gymsDaoService: GymsDaoService, gymGradesDaoService: GymGradesDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/gym.model").GymModel, import("../database/models/gym.model").GymModel[]>;
    getGrades(id: number): import("objection").QueryBuilder<import("../database/models/gymGrade.model").GymGradeModel, import("../database/models/gymGrade.model").GymGradeModel[]>;
}
