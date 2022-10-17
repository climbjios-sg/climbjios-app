import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';
import { AuthProvider } from 'src/utils/types';

@Injectable()
export class UserDaoService {
  constructor(@Inject('UserModel') private userModel: ModelClass<UserModel>) {}

  findById(userId: string, select?: string | string[]) {
    let query = this.userModel.query().findById(userId);
    if (select) {
      query = query.select(select);
    }
    return query;
  }

  updateById(userid: string, user: Partial<UserModel>) {
    return this.userModel.query().patch(user).findById(userid);
  }

  async findOrCreateOAuthUser(user: Partial<UserModel>) {
    const { authProviderId, authProvider } = user;

    const existingEntry = await this.userModel.query().findOne({
      authProviderId,
      authProvider,
    });

    if (existingEntry) {
      return existingEntry;
    }

    return await this.userModel.query().insertGraph(user);
  }

  // Used only for metric alerts
  getTelegramUserCount() {
    return this.userModel
      .query()
      .count()
      .where({ authProvider: AuthProvider.TELEGRAM })
      .first()
      .then((r: any) => r.count);
  }

  // Used only for metric alerts
  getGoogleUserCount() {
    return this.userModel
      .query()
      .count()
      .where({ authProvider: AuthProvider.GOOGLE })
      .first()
      .then((r: any) => r.count);
  }
}
