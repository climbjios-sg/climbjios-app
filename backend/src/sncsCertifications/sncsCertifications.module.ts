import { Module } from '@nestjs/common';
import { SncsCertificationsController } from './sncsCertifications.controller';
import { SncsCertificationsService } from './sncsCertifications.service';

@Module({
  controllers: [SncsCertificationsController],
  providers: [SncsCertificationsService],
})
export class SncsCertificationsModule {}
