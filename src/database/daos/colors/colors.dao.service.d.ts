import { ColorModel } from './../../models/color.model';
import { ModelClass } from 'objection';
export declare class ColorsDaoService {
    private colorModel;
    constructor(colorModel: ModelClass<ColorModel>);
    getAll(): import("objection").QueryBuilder<ColorModel, ColorModel[]>;
}
