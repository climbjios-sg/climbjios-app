import { WallModel } from '../../models/wall.model';
import { ModelClass } from 'objection';
export declare class WallsDaoService {
    private wallModel;
    constructor(wallModel: ModelClass<WallModel>);
    getAll(): import("objection").QueryBuilder<WallModel, WallModel[]>;
}
