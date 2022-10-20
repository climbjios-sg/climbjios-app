import { WallsService } from './walls.service';
export declare class WallsController {
    private readonly wallsService;
    constructor(wallsService: WallsService);
    getAll(): import("objection").QueryBuilder<import("../database/models/wall.model").WallModel, import("../database/models/wall.model").WallModel[]>;
}
