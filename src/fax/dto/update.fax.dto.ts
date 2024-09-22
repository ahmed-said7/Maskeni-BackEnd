import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFaxDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  answer: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  question: string;
}
