import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConstantsModule } from 'src/utils/constants/constants.module';
import { JwtAuthService } from './jwtAuth.service';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
  imports: [JwtModule, ConstantsModule],
  providers: [JwtAuthStrategy, JwtAuthService],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
