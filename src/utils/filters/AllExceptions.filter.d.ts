import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UserProfileDaoService } from '../../database/daos/userProfiles/userProfile.dao.service';
import { LoggerService } from '../logger/logger.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly loggerService;
    private readonly userProfileDaoService;
    constructor(httpAdapterHost: HttpAdapterHost, loggerService: LoggerService, userProfileDaoService: UserProfileDaoService);
    catch(exception: Error, host: ArgumentsHost): Promise<void>;
}
