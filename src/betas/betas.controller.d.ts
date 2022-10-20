import { BetasService } from './betas.service';
import CreateBetaDto from './dtos/createBeta.dto';
export declare class BetasController {
    private readonly betasService;
    constructor(betasService: BetasService);
    getVideoUploadUrl(): Promise<{
        cloudflareUploadUrl: any;
        cloudflareVideoUid: any;
    }>;
    createBeta(req: any, body: CreateBetaDto): Promise<import("../database/models/beta.model").BetaModel>;
}
