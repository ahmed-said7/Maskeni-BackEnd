import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  content: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string;
}
