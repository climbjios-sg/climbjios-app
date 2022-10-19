import { ModelClass } from 'objection';
import { SncsCertificationModel } from '../../../database/models/sncsCertification.model';
export declare class SncsCertificationsDaoService {
    private sncsCertificationModel;
    constructor(sncsCertificationModel: ModelClass<SncsCertificationModel>);
    getAll(): import("objection").QueryBuilder<SncsCertificationModel, SncsCertificationModel[]>;
    findById(id: number): import("objection").QueryBuilder<SncsCertificationModel, SncsCertificationModel>;
}
