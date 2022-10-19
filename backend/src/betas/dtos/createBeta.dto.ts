import { IsString, IsNumber, IsDefined } from 'class-validator';

export default class CreateBetaDto {
  @IsNumber()
  @IsDefined()
  gymId: number;

  @IsNumber()
  @IsDefined()
  gymGradeId: number;

  @IsNumber()
  @IsDefined()
  wallId: number;

  @IsNumber()
  @IsDefined()
  colorId: number;

  @IsString()
  @IsDefined()
  cloudflareVideoUid: string;
}
