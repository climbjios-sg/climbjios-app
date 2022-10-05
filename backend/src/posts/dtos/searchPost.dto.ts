import { Transform } from 'class-transformer';
import {
  IsNumber,
  Min,
  IsInt,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export default class SearchPostDto {
  @IsOptional()
  @IsBoolean()
  @Transform((val) =>
    val.value === 'true' ? true : val.value === 'false' ? false : '',
  )
  isBuyer: boolean;

  @IsOptional()
  @Transform((val) => parseInt(val.value))
  @IsInt()
  @Min(1)
  numPasses: number;

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
}
