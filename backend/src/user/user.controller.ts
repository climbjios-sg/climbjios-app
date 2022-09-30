import { Body, Controller, Patch, Req } from '@nestjs/common';
import PostUserDto from './dtos/postUser.dto';
import PostOnboardingDto from './dtos/postOnboarding.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  postUser(@Req() req, @Body() body: PostUserDto) {
    return this.userService.patchUser(req.user.id, body);
  }

  @Patch('onboarding')
  postOnboarding(@Req() req, @Body() body: PostOnboardingDto) {
    return this.userService.patchUser(req.user.id, body);
  }
}
