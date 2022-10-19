import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UserProfileDaoService } from '../../database/daos/userProfiles/userProfile.dao.service';
import { TelegramAlertsService } from '../telegramAlerts/telegramAlerts.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly telegramAlertsService;
    private readonly userProfileDaoService;
    constructor(httpAdapterHost: HttpAdapterHost, telegramAlertsService: TelegramAlertsService, userProfileDaoService: UserProfileDaoService);
    catch(exception: Error, host: ArgumentsHost): Promise<void>;
}
