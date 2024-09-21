import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image: string;
}
