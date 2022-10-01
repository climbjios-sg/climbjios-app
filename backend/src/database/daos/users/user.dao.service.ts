import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class UserDaoService {
  constructor(@Inject('UserModel') private userModel: ModelClass<UserModel>) {}

  findById(userId: string) {
    return this.userModel.query().findById(userId);
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
}
