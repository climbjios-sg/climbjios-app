import { GymsDaoService } from 'src/database/daos/gyms/gyms.dao.service';
export declare class GymsService {
    private readonly gymsDaoService;
    constructor(gymsDaoService: GymsDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/gym.model").GymModel, import("../database/models/gym.model").GymModel[]>;
}
