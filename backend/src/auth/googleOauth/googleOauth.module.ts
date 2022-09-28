import { Module } from '@nestjs/common';
import { ConstantsModule } from 'src/utils/constants/constants.module';
import { GoogleOauthStrategy } from './googleOauth.strategy';

@Module({
  imports: [ConstantsModule],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
