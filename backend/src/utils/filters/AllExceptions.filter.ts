import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UserDaoService } from 'src/database/daos/users/user.dao.service';
import { TelegramAlertsService } from '../telegramAlerts/telegramAlerts.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly telegramAlertsService: TelegramAlertsService,
    private readonly userDaoService: UserDaoService,
  ) {}

  async catch(exception: Error, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    console.log(request);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      path: httpAdapter.getRequestUrl(request),
    };

    // Log error
    this.telegramAlertsService.error({
      ...responseBody,
      timestamp: new Date().toISOString(),
      user: request.user
        ? await this.userDaoService.findById(request.user.id, [
            'id',
            'name',
            'telegramHandle',
          ])
        : undefined,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
