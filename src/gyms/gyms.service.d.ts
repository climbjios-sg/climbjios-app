import { GymsDaoService } from '../database/daos/gyms/gyms.dao.service';
import { GymGradesDaoService } from '../database/daos/gymGrades/gymGrades.dao.service';
import { GymsSearchDaoService } from '../database/daos/gymsSearch/gymsSearch.dao.service';
import { PassesDaoService } from '../database/daos/passes/passes.dao.service';
export declare class GymsService {
    private readonly gymsDaoService;
    private readonly gymGradesDaoService;
    private readonly gymsSearchDaoService;
    private readonly passesDaoService;
    constructor(gymsDaoService: GymsDaoService, gymGradesDaoService: GymGradesDaoService, gymsSearchDaoService: GymsSearchDaoService, passesDaoService: PassesDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/gym.model").GymModel, import("../database/models/gym.model").GymModel[]>;
    getGrades(gymId: number): Promise<import("../database/models/gymGrade.model").GymGradeModel[]>;
    getPasses(gymId: number): Promise<{
        gymOutletPasses: import("../database/models/gymPass.model").PassModel[];
        gymGroupPasses: import("../database/models/gymPass.model").PassModel[];
    }>;
    searchGyms(substring: string): Promise<{
        gymOutlets: import("../database/models/gym.model").GymModel[];
        name: string;
        permanentlyClosed: boolean;
        passGroupId: number;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        $modelClass: import("objection").ModelClass<import("../database/models/gymGroup.model").GymGroupModel>;
        QueryBuilderType: import("objection").QueryBuilder<import("../database/models/gymGroup.model").GymGroupModel, import("../database/models/gymGroup.model").GymGroupModel[]>;
    }[]>;
    getGymDetails(id: number): Promise<import("../database/models/gym.model").GymModel>;
}
