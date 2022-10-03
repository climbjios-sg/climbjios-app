import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConstantsService } from './constants.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
    }),
  ],
  providers: [ConstantsService],
  exports: [ConstantsService],
})
export class ConstantsModule {}
