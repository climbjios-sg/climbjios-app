import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import PatchUserProfileDto from './dtos/patchUserProfile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserProfile(@Req() req) {
    return this.userService.getUserProfile(req.user.id);
  }

  @Patch()
  async patchUserProfile(@Req() req, @Body() body: PatchUserProfileDto) {
    return await this.userService.patchUserProfile(req.user.id, body);
  }
}
