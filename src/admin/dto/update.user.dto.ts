import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(4)
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMobilePhone()
  mobile: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fcm: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon: string;
}
