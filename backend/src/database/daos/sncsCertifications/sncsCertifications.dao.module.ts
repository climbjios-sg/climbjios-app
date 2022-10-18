import { Global, Module } from '@nestjs/common';
import { SncsCertificationsDaoService } from './sncsCertifications.dao.service';

@Global()
@Module({
  providers: [SncsCertificationsDaoService],
  exports: [SncsCertificationsDaoService],
})
export class SncsCertificationsDaoModule {}
