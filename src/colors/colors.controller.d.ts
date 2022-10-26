import { ColorsService } from './colors.service';
export declare class ColorsController {
    private readonly colorsService;
    constructor(colorsService: ColorsService);
    getAll(): import("objection").QueryBuilder<import("../database/models/color.model").ColorModel, import("../database/models/color.model").ColorModel[]>;
}
