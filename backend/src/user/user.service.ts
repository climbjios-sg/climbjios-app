import { Injectable } from '@nestjs/common';
import { UserDaoService } from 'src/database/daos/users/user.dao.service';
import PostOnboardingDto from './dtos/postOnboarding.dto';
import PostUserDto from './dtos/postUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDaoService: UserDaoService) {}

  patchUser(userid: string, body: PostOnboardingDto | PostUserDto) {
    return this.userDaoService.updateById(userid, body);
  }
}
