import { PronounsDaoService } from '../database/daos/pronouns/pronouns.dao.service';
export declare class PronounsService {
    private readonly pronounsDaoService;
    constructor(pronounsDaoService: PronounsDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/pronoun.model").PronounModel, import("../database/models/pronoun.model").PronounModel[]>;
}
