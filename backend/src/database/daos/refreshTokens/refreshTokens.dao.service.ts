import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { RefreshTokenModel } from '../../models/refreshToken.model';

@Injectable()
export class RefreshTokensDaoService {
  constructor(
    @Inject('RefreshTokenModel')
    private refreshTokenModel: ModelClass<RefreshTokenModel>,
  ) {}

  create(userId: string, refreshToken: string) {
    return this.refreshTokenModel.query().insert({ userId, refreshToken });
  }

  patchByRefreshToken(oldRefreshToken: string, newRefreshToken: string) {
    return this.refreshTokenModel
      .query()
      .patch({ refreshToken: newRefreshToken })
      .where({ refreshToken: oldRefreshToken });
  }

  findByUserId(userId: string) {
    return this.refreshTokenModel.query().select().where({ userId });
  }

  /**
   * To be run by cronjob. Deletes entries that have not been updated for at least a month.
   */
  deleteExpired() {
    return this.refreshTokenModel
      .query()
      .delete()
      .where(
        'updatedAt',
        '<',
        (() => {
          let date = new Date();
          date.setDate(new Date().getDate() - 31);
          return date;
        })(),
      );
  }
}
