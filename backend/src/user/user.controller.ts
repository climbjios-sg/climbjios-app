import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import PatchUserDto from './dtos/patchUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUserInfo(@Req() req) {
    return this.userService.getUserInfo(req.user.id);
  }

  @Patch()
  postUser(@Req() req, @Body() body: PatchUserDto) {
    return this.userService.patchUser(req.user.id, body);
  }
}
