import { IsNumber, IsOptional } from 'class-validator';

export class FeedQueryDto {
  @IsNumber()
  @IsOptional()
  page: number;
  @IsOptional()
  @IsNumber()
  limit: number;
  quarter: string;
  country: string;
  city: string;
}
