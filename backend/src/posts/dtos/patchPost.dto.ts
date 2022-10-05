import {
  IsBoolean,
  IsString,
  IsNumber,
  Min,
  IsInt,
  IsOptional,
  IsDateString,
  IsIn,
} from 'class-validator';
import { PostType } from '../../utils/types';
import { DateIsAfterNow } from '../../utils/dtoValidators/DateIsAfterNow';
import { DateMatch } from '../../utils/dtoValidators/DateMatch';

export default class PatchPostDto {
  @IsOptional()
  @IsIn(Object.values(PostType))
  type: PostType;

  @IsOptional()
  @IsInt()
  @Min(0)
  numPasses: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  gymId: number;

  @IsOptional()
  @IsDateString()
  @DateIsAfterNow()
  @DateMatch(PatchPostDto, (dto) => dto.endDateTime, true)
  startDateTime: Date;

  @IsOptional()
  @IsDateString()
  @DateIsAfterNow()
  @DateMatch(PatchPostDto, (dto) => dto.startDateTime, true)
  endDateTime: Date;

  @IsOptional()
  @IsBoolean()
  openToClimbTogether: boolean;

  @IsOptional()
  @IsString()
  optionalNote: string;

  @IsOptional()
  @IsBoolean()
  isClosed: boolean;
}
