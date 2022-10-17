import { JwtService } from '@nestjs/jwt';
import { UserDaoService } from '../../database/daos/users/user.dao.service';
import { ConstantsService } from '../../utils/constants/constants.service';
export declare class JwtAuthService {
    private readonly jwtService;
    private readonly constantsService;
    private readonly userDaoService;
    constructor(jwtService: JwtService, constantsService: ConstantsService, userDaoService: UserDaoService);
    private generateAccessToken;
    private generateRefreshToken;
    private verifyRefreshToken;
    generateJwts(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateJwtsFromRefreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
