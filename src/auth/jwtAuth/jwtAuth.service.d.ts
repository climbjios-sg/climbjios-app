import { JwtService } from '@nestjs/jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { RefreshTokensDaoService } from '../../database/daos/refreshTokens/refreshTokens.dao.service';
export declare class JwtAuthService {
    private readonly jwtService;
    private readonly constantsService;
    private readonly refreshTokensDaoService;
    constructor(jwtService: JwtService, constantsService: ConstantsService, refreshTokensDaoService: RefreshTokensDaoService);
    private generateAccessToken;
    private generateRefreshToken;
    private verifyRefreshToken;
    generateJwts(user: any, oldToken?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateJwtsFromRefreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
