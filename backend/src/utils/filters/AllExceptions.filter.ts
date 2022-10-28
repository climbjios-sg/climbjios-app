import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UserProfileDaoService } from '../../database/daos/userProfiles/userProfile.dao.service';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
    private readonly userProfileDaoService: UserProfileDaoService,
  ) {}

  async catch(exception: Error, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody;
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        responseBody = {
          message: res,
        };
      } else {
        responseBody = res;
      }
    } else {
      responseBody = {
        message: exception.message,
      };
    }

    // Log error
    this.loggerService.error({
      statusCode: httpStatus,
      ...responseBody,
      path: httpAdapter.getRequestUrl(request),
      timestamp: new Date().toISOString(),
      user: request.user
        ? await this.userProfileDaoService.findByUserId({
            userId: request.user.id,
            select: ['userId', 'name', 'telegramHandle'],
          })
        : undefined,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
