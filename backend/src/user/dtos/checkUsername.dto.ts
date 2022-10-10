import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export default class CheckUsernameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;
}
