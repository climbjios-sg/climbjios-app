import {
  IsString,
  IsBoolean,
  IsInt,
  Min,
  IsNumber,
  IsDefined,
  IsDateString,
  IsOptional,
  IsIn,
} from 'class-validator';
import { PostType } from '../../utils/types';
import { DateIsAfter } from '../../utils/dtoValidators/DateIsAfter';
import { DateIsAfterNow } from '../../utils/dtoValidators/DateIsAfterNow';
import { DateMatch } from '../../utils/dtoValidators/DateMatch';

export default class CreatePostDto {
  @IsDefined()
  @IsIn(Object.values(PostType))
  type: PostType;

  @IsInt()
  @IsDefined()
  @Min(0)
  numPasses: number;

  @IsNumber()
  @IsDefined()
  @Min(0)
  price: number;

  @IsNumber()
  @IsDefined()
  gymId: number;

  @IsDateString()
  @DateIsAfterNow()
  @IsOptional()
  startDateTime: Date;

  @IsDateString()
  @IsOptional()
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
