import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwtAuth.service';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  providers: [JwtAuthStrategy, JwtAuthService],
})
export class JwtAuthModule {}
