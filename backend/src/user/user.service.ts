import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import { PostsDaoService } from 'src/database/daos/posts/posts.dao.service';
import { UserDaoService } from 'src/database/daos/users/user.dao.service';
import PatchUserDto from './dtos/patchUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userDaoService: UserDaoService,
    private readonly postsDaoService: PostsDaoService,
  ) {}

  getUserInfo(userId: string) {
    return this.userDaoService.findById(userId, [
      'id',
      'name',
      'username',
      'telegramHandle',
    ]);
  }

  patchUser(userid: string, body: PatchUserDto) {
    return this.userDaoService.updateById(userid, body);
  }

  deleteAllUserDataAndPosts(userId: string) {
    return Model.transaction(async (trx) =>
      this.postsDaoService
        .deleteAllUserPosts(userId, trx)
        .then(() => this.userDaoService.deleteUserAccount(userId, trx)),
    );
  }

  checkUsernameExists(username: string) {
    return this.userDaoService.checkUsernameExists(username);
  }

  getByUsername(username: string) {
    return this.userDaoService.findByUsername(username);
  }
}
