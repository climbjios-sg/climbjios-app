import { IsString, IsNotEmpty, ValidateIf, MaxLength } from 'class-validator';

export default class PostUserDto {
  @ValidateIf((o) => (!o.telegramHandle && !o.name) || o.username)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @ValidateIf((o) => (!o.username && !o.name) || o.telegramHandle)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  telegramHandle: string;

  @ValidateIf((o) => (!o.telegramHandle && !o.username) || o.name)
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
