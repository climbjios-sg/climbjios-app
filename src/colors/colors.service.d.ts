import { ColorsDaoService } from '../database/daos/colors/colors.dao.service';
export declare class ColorsService {
    private readonly colorsDaoService;
    constructor(colorsDaoService: ColorsDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/color.model").ColorModel, import("../database/models/color.model").ColorModel[]>;
}
