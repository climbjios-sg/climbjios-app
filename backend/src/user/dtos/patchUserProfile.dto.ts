import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

export default class PatchUserProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(300)
  height: number;

  @IsOptional()
  @IsNumber()
  @Min(-20)
  @Max(20)
  reach: number;

  @IsOptional()
  @IsNumber()
  pronounId: number;

  @IsOptional()
  @IsNumber()
  highestBoulderingGradeId: number;

  @IsOptional()
  @IsNumber()
  highestTopRopeGradeId: number;

  @IsOptional()
  @IsNumber()
  highestLeadClimbingGradeId: number;

  @IsOptional()
  @IsNumber()
  sncsCertificationId: number;

  @IsOptional()
  @IsNotEmpty()
  bio: string;

  @IsOptional()
  @ArrayMinSize(1)
  @IsNumber(undefined, { each: true })
  favouriteGymIds: number[];
}
