import { ModelClass } from 'objection';
import { PronounModel } from '../../models/pronoun.model';
export declare class PronounsDaoService {
    private PronounModel;
    constructor(PronounModel: ModelClass<PronounModel>);
    getAll(): import("objection").QueryBuilder<PronounModel, PronounModel[]>;
    findById(id: number): import("objection").QueryBuilder<PronounModel, PronounModel>;
}
