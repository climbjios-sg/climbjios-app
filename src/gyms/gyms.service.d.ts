import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { GymGradesDaoService } from '../database/daos/gymGrades/gymGrades.dao.service';
export declare class GymsService {
    private readonly gymsDaoService;
    private readonly gymGradesDaoService;
    constructor(gymsDaoService: GymsDaoService, gymGradesDaoService: GymGradesDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/gym.model").GymModel, import("../database/models/gym.model").GymModel[]>;
    getGrades(gymId: number): Promise<import("../database/models/gymGrade.model").GymGradeModel[]>;
}