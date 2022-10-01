import {
  IsBoolean,
  IsString,
  IsNumber,
  Min,
  IsInt,
  IsIn,
  IsDateString,
  IsOptional,
  ArrayMinSize,
  ValidateIf,
} from 'class-validator';
import { Timing } from 'src/utils/types';

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
  date: Date;

  @IsOptional()
  @IsBoolean()
  openToClimbTogether: boolean;

  @IsOptional()
  @IsString()
  optionalNote: string;

  @IsOptional()
  @IsBoolean()
  isClosed: boolean;

  @ValidateIf((o) => !!o.timings)
  @ArrayMinSize(1)
  @IsIn(Object.values(Timing), { each: true })
  timings: Timing[];
}
