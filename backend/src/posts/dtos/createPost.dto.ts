import {
  IsString,
  IsBoolean,
  IsInt,
  Min,
  IsNumber,
  IsDefined,
  IsDateString,
  IsIn,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Timing } from '../../utils/types';

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
  date: Date;

  @IsBoolean()
  @IsDefined()
  openToClimbTogether: boolean;

  @IsOptional()
  @IsString()
  optionalNote: string;

  @ArrayMinSize(1)
  @IsIn(Object.values(Timing), { each: true })
  timings: Timing[];
}
