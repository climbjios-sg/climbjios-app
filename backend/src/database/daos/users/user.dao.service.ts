import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, Transaction } from 'objection';
import { UserModel } from 'src/database/models/user.model';

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

  findByUsername(username: string) {
    return this.userModel.query().findOne({ username });
  }

  findByTelegramHandle(telegramHandle: string) {
    return this.userModel.query().findOne({ telegramHandle });
  }

  updateById(userid: string, user: Partial<UserModel>) {
    return this.userModel
      .query()
      .patch(user)
      .findById(userid)
      .returning(['id', 'name', 'username', 'telegramHandle']);
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

    return await this.userModel.query().insert(user).returning('*');
  }

  deleteUserAccount(userId: string, trx: Transaction) {
    return this.userModel.query(trx).deleteById(userId);
  }

  async checkUsernameExists(username: string) {
    return !!(await this.userModel.query().findOne({ username }));
  }

  async checkTelegramHandleExists(telegramHandle: string) {
    return !!(await this.userModel.query().findOne({ telegramHandle }));
  }

  // Used only for metric alerts
  getUserCount() {
    return this.userModel
      .query()
      .count()
      .first()
      .then((r: any) => r.count);
  }
}
