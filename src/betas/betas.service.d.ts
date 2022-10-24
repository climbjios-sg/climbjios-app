import { BetasDaoService } from './../database/daos/betas/betas.dao.service';
import { HttpService } from '@nestjs/axios';
import { ConstantsService } from '../utils/constants/constants.service';
import CreateBetaDto from './dtos/createBeta.dto';
import GetBetasDto from './dtos/getBetas.dto';
export declare class BetasService {
    private readonly constantsService;
    private readonly httpService;
    private readonly betaDaoService;
    constructor(constantsService: ConstantsService, httpService: HttpService, betaDaoService: BetasDaoService);
    createBeta(creatorId: string, body: CreateBetaDto): Promise<import("../database/models/beta.model").BetaModel>;
    private getBetasHelper;
    getCreatorBetas(creatorId: string, query: GetBetasDto): Promise<{
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
    deleteBeta(creatorId: string, betaId: string): Promise<import("../database/models/beta.model").BetaModel>;
    getVideoUploadUrl(): Promise<{
        cloudflareUploadUrl: any;
        cloudflareVideoUid: any;
    }>;
}
