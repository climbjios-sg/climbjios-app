import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export default class GetBetasDto {
  @Transform((val) => parseInt(val.value))
  @IsInt()
  @IsOptional()
  gymId: number;

  @Transform((val) => parseInt(val.value))
  @IsInt()
  @IsOptional()
  gymGradeId: number;

  @Transform((val) => parseInt(val.value))
  @IsInt()
  @IsOptional()
  wallId: number;

  @Transform((val) => parseInt(val.value))
  @IsInt()
  @IsOptional()
  colorId: number;

  @Transform((val) => parseInt(val.value))
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;

  @Transform((val) => parseInt(val.value))
  @IsInt()
  @Min(0)
  @IsOptional()
  page: number;

  @Transform((val) => parseInt(val.value))
  @IsInt()
  @Min(1)
  @IsOptional()
  pageSize: number;
}
