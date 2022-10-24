import { BetasService } from './betas.service';
import CreateBetaDto from './dtos/createBeta.dto';
import GetBetasDto from './dtos/getBetas.dto';
export declare class BetasController {
    private readonly betasService;
    constructor(betasService: BetasService);
    createBeta(req: any, body: CreateBetaDto): Promise<import("../database/models/beta.model").BetaModel>;
    getCreatorBetas(query: GetBetasDto, params: any): Promise<{
        data: import("objection").Page<import("../database/models/beta.model").BetaModel>;
        metadata: {
            totalCount: number;
            currentPage: number;
            pageSize: number;
            totalPages: number;
            isLastPage: boolean;
        };
    }>;
    getBetas(query: GetBetasDto): Promise<{
        data: import("objection").Page<import("../database/models/beta.model").BetaModel>;
        metadata: {
            totalCount: number;
            currentPage: number;
            pageSize: number;
            totalPages: number;
            isLastPage: boolean;
        };
    }>;
    deleteBeta(req: any, params: any): Promise<import("../database/models/beta.model").BetaModel>;
    getVideoUploadUrl(): Promise<{
        cloudflareUploadUrl: any;
        cloudflareVideoUid: any;
    }>;
}
