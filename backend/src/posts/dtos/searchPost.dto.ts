import { Transform } from 'class-transformer';
import {
  IsNumber,
  Min,
  IsInt,
  IsDateString,
  IsOptional,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { PostType } from '../../utils/types';

export default class SearchPostDto {
  @IsOptional()
  @IsIn(Object.values(PostType))
  type: PostType;

  @IsOptional()
  @Transform((val) => parseInt(val.value))
  @IsInt()
  @Min(0)
  numPasses: number;

  @IsOptional()
  @Transform((val) => parseFloat(val.value))
  @IsNumber()
  @Min(1)
  price: number;

  @IsOptional()
  @Transform((val) => parseInt(val.value))
  @IsNumber()
  gymId: number;

  @IsOptional()
  @IsDateString()
  startDateTime: Date;

  @IsOptional()
  @IsDateString()
  endDateTime: Date;

  @IsOptional()
  @IsBoolean()
  @Transform((val) =>
    val.value === 'true' ? true : val.value === 'false' ? false : '',
  )
  isClosed = false;
}
