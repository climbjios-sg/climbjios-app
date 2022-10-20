import { BetasDaoService } from './../database/daos/betas/betas.dao.service';
import { HttpService } from '@nestjs/axios';
import { ConstantsService } from '../utils/constants/constants.service';
import CreateBetaDto from './dtos/createBeta.dto';
export declare class BetasService {
    private readonly constantsService;
    private readonly httpService;
    private readonly betaDaoService;
    constructor(constantsService: ConstantsService, httpService: HttpService, betaDaoService: BetasDaoService);
    createBeta(creatorId: string, body: CreateBetaDto): Promise<import("../database/models/beta.model").BetaModel>;
    getVideoUploadUrl(): Promise<{
        cloudflareUploadUrl: any;
        cloudflareVideoUid: any;
    }>;
}
