import { GymsService } from './gyms.service';
export declare class GymsController {
    private readonly gymsService;
    constructor(gymsService: GymsService);
    getAll(): import("objection").QueryBuilder<import("../database/models/gym.model").GymModel, import("../database/models/gym.model").GymModel[]>;
}
