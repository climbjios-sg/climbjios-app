import { ModelClass } from 'objection';
import { BetaModel } from '../../models/beta.model';
import CreateBetaDto from '../../../betas/dtos/createBeta.dto';
export declare class BetasDaoService {
    private betaModel;
    constructor(betaModel: ModelClass<BetaModel>);
    create(beta: CreateBetaDto & {
        creatorId: string;
    }): import("objection").QueryBuilder<BetaModel, BetaModel>;
}
