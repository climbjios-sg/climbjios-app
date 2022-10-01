import { Transform } from 'class-transformer';
import {
  IsNumber,
  Min,
  IsInt,
  IsIn,
  IsDateString,
  IsOptional,
  ArrayMinSize,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import { Timing } from 'src/utils/types';

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
  date: Date;

  @ValidateIf((o) => !!o.timings)
  @ArrayMinSize(1)
  @IsIn(Object.values(Timing), { each: true })
  timings: Timing[];
}
