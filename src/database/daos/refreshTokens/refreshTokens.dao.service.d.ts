import { ModelClass } from 'objection';
import { RefreshTokenModel } from '../../models/refreshToken.model';
export declare class RefreshTokensDaoService {
    private refreshTokenModel;
    constructor(refreshTokenModel: ModelClass<RefreshTokenModel>);
    create(userId: string, refreshToken: string): import("objection").QueryBuilder<RefreshTokenModel, RefreshTokenModel>;
    patchByRefreshToken(oldRefreshToken: string, newRefreshToken: string): import("objection").QueryBuilder<RefreshTokenModel, number>;
    findByUserId(userId: string): import("objection").QueryBuilder<RefreshTokenModel, RefreshTokenModel[]>;
    deleteExpired(): import("objection").QueryBuilder<RefreshTokenModel, number>;
}
