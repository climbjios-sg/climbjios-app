import { SncsCertificationsDaoService } from '../database/daos/sncsCertifications/sncsCertifications.dao.service';
export declare class SncsCertificationsService {
    private readonly sncsCertificationsDaoService;
    constructor(sncsCertificationsDaoService: SncsCertificationsDaoService);
    getAll(): import("objection").QueryBuilder<import("../database/models/sncsCertification.model").SncsCertificationModel, import("../database/models/sncsCertification.model").SncsCertificationModel[]>;
}
