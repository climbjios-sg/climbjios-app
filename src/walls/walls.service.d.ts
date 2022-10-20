import { WallsDaoService } from '../database/daos/walls/walls.dao.service';
export declare class WallsService {
    private readonly wallsDaoService;
    constructor(wallsDaoService: WallsDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/wall.model").WallModel, import("../database/models/wall.model").WallModel[]>;
}
