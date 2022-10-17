import { HttpService } from '@nestjs/axios';
import { ConstantsService } from '../constants/constants.service';
export declare class TelegramAlertsService {
    private readonly constantsService;
    private readonly httpService;
    constructor(constantsService: ConstantsService, httpService: HttpService);
    private send;
    log(data: Object): void;
    error(data: Object): void;
}
