import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateCommentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string;
  user: string;
}
