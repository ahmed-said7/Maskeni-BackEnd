import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class FeedQueryDto {
  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  page: number;
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  limit: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  country: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  city: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  quarter: string;
}
