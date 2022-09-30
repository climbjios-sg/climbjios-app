import { Body, Controller, Patch, Req } from '@nestjs/common';
import PatchUserDto from './dtos/patchUser.dto';
import PatchOnboardingDto from './dtos/patchOnboarding.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  postUser(@Req() req, @Body() body: PatchUserDto) {
    return this.userService.patchUser(req.user.id, body);
  }

  @Patch('onboarding')
  postOnboarding(@Req() req, @Body() body: PatchOnboardingDto) {
    return this.userService.patchUser(req.user.id, body);
  }
}
