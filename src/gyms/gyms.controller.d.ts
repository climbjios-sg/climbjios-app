import { GymsService } from './gyms.service';
export declare class GymsController {
    private readonly gymsService;
    constructor(gymsService: GymsService);
    getGrades(id: number): Promise<import("../database/models/gymGrade.model").GymGradeModel[]>;
    getPasses(id: number): Promise<{
        gymOutletPasses: import("../database/models/gymPass.model").PassModel[];
        gymGroupPasses: import("../database/models/gymPass.model").PassModel[];
    }>;
    searchGyms(substring?: string): Promise<{
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
    getGymDetails(id?: number): import("objection").QueryBuilder<import("../database/models/gym.model").GymModel, import("../database/models/gym.model").GymModel[]> | Promise<import("../database/models/gym.model").GymModel>;
}
