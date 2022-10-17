import { SncsCertificationsService } from './sncsCertifications.service';
export declare class SncsCertificationsController {
    private readonly sncsCertificationsService;
    constructor(sncsCertificationsService: SncsCertificationsService);
    getAll(): import("objection").QueryBuilder<import("../database/models/sncsCertification.model").SncsCertificationModel, import("../database/models/sncsCertification.model").SncsCertificationModel[]>;
}
