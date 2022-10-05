import {
  IsBoolean,
  IsString,
  IsNumber,
  Min,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DateIsAfterNow } from '../../utils/dtoValidators/DateIsAfterNow';
import { DateMatch } from '../../utils/dtoValidators/DateMatch';

export default class PatchPostDto {
  @IsOptional()
  @IsBoolean()
  isBuy: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
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
