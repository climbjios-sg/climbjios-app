import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConstantsModule } from 'src/utils/constants/constants.module';
import { ConstantsService } from 'src/utils/constants/constants.service';
import { JwtAuthService } from './jwtAuth.service';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConstantsModule],
      useFactory: async (constantsService: ConstantsService) => {
        return {
          secret: constantsService.JWT_SECRET,
          signOptions: {
            expiresIn: constantsService.JWT_EXPIRES_IN,
          },
        };
      },
      inject: [ConstantsService],
    }),
    ConstantsModule,
  ],
  providers: [JwtAuthStrategy, JwtAuthService],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
