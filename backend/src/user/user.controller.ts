import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Patch,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import CheckUsernameDto from './dtos/checkUsername.dto';
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
  async postUser(@Req() req, @Body() body: PatchUserDto) {
    const USERNAME_IN_USE_ERROR_MESSAGE = 'username already in use!';

    if (
      body.username &&
      (await this.userService.checkUsernameExists(body.username))
    ) {
      throw new HttpException(USERNAME_IN_USE_ERROR_MESSAGE, 409);
    }
    return await this.userService.patchUser(req.user.id, body);
  }

  @Delete()
  deleteAllUserDataAndPosts(@Req() req) {
    return this.userService.deleteAllUserDataAndPosts(req.user.id);
  }

  @Get('checkUsername')
  async checkUsernameExists(
    @Res() res: Response,
    @Query() query: CheckUsernameDto,
  ) {
    return (await this.userService.checkUsernameExists(query.username))
      ? res.sendStatus(200)
      : res.sendStatus(404);
  }
}
