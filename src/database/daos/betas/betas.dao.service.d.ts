import { ModelClass } from 'objection';
import { BetaModel } from '../../models/beta.model';
import CreateBetaDto from '../../../betas/dtos/createBeta.dto';
import { GetBetasQuery } from '../../../betas/dtos/getBetas.dto';
declare type CreateBetaQuery = CreateBetaDto & {
    creatorId: string;
};
export declare class BetasDaoService {
    private betaModel;
    static allGraphs: string;
    constructor(betaModel: ModelClass<BetaModel>);
    create(beta: CreateBetaQuery): import("objection").QueryBuilder<BetaModel, BetaModel>;
    private buildGetQuery;
    getAll(args: GetBetasQuery): import("objection").QueryBuilder<BetaModel, import("objection").Page<BetaModel>>;
    deleteById(betaId: string): import("objection").QueryBuilder<BetaModel, BetaModel>;
    getById(betaId: string): import("objection").QueryBuilder<BetaModel, BetaModel>;
    getCount(args: GetBetasQuery): Promise<number>;
}
export {};
