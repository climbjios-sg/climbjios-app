import { Injectable } from '@nestjs/common';
import { UserDaoService } from 'src/database/daos/users/user.dao.service';
import PatchOnboardingDto from './dtos/patchOnboarding.dto';
import PatchUserDto from './dtos/patchUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDaoService: UserDaoService) {}

  patchUser(userid: string, body: PatchOnboardingDto | PatchUserDto) {
    return this.userDaoService.updateById(userid, body);
  }
}
