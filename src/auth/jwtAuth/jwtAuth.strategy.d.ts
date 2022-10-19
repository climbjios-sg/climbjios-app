import { Strategy } from 'passport-jwt';
import { ConstantsService } from '../../utils/constants/constants.service';
import { JwtPayload } from '../../utils/types';
declare const JwtAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    constructor(constantsService: ConstantsService);
    validate(payload: JwtPayload): Promise<{
        id: string;
    }>;
}
export {};
