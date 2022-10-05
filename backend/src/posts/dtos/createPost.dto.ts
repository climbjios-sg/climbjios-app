import {
  IsString,
  IsBoolean,
  IsInt,
  Min,
  IsNumber,
  IsDefined,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { DateIsAfter } from '../../utils/dtoValidators/DateIsAfter';
import { DateIsAfterNow } from '../../utils/dtoValidators/DateIsAfterNow';
import { DateMatch } from '../../utils/dtoValidators/DateMatch';

export default class CreatePostDto {
  @IsBoolean()
  @IsDefined()
  isBuy: boolean;

  @IsInt()
  @IsDefined()
  @Min(1)
  numPasses: number;

  @IsNumber()
  @IsDefined()
  @Min(0)
  price: number;

  @IsNumber()
  @IsDefined()
  gymId: number;

  @IsDateString()
  @IsDefined()
  @DateIsAfterNow()
  startDateTime: Date;

  @IsDateString()
  @IsDefined()
  @DateIsAfterNow()
  @DateMatch(CreatePostDto, (dto) => dto.startDateTime)
  @DateIsAfter(CreatePostDto, (dto) => dto.startDateTime)
  endDateTime: Date;

  @IsBoolean()
  @IsDefined()
  openToClimbTogether: boolean;

  @IsOptional()
  @IsString()
  optionalNote: string;
}
