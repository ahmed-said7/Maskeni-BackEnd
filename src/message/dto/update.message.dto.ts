import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string;
}
