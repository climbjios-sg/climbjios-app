import { Request, Response } from 'express';
import { ConstantsService } from '../utils/constants/constants.service';
import RefreshDto from './dtos/refresh.dto';
import { JwtAuthService } from './jwtAuth/jwtAuth.service';
import { UserProfileDaoService } from '../database/daos/userProfiles/userProfile.dao.service';
export declare class AuthController {
    private readonly jwtAuthService;
    private readonly constantsService;
    private readonly userProfileService;
    constructor(jwtAuthService: JwtAuthService, constantsService: ConstantsService, userProfileService: UserProfileDaoService);
    telegramAuthRedirect(req: Request, res: Response): Promise<void>;
    refreshTokenFlow(body: RefreshDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
