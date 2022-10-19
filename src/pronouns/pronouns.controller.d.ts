import { PronounsService } from './pronouns.service';
export declare class PronounsController {
    private readonly pronounsService;
    constructor(pronounsService: PronounsService);
    getAll(): import("objection").QueryBuilder<import("../database/models/pronoun.model").PronounModel, import("../database/models/pronoun.model").PronounModel[]>;
}
