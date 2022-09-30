import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export default class PatchOnboardingDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  telegramHandle: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
