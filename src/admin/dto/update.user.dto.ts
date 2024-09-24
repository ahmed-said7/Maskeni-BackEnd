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
  @MinLength(4, { message: 'Name must be at least 4 characters long' })
  name?: string; // Adding `?` for clarity that this is optional

  @ApiPropertyOptional()
  @IsOptional()
  @IsMobilePhone()
  mobile?: string; // Adding `?`

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fcm?: string; // Adding `?`

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon?: string; // Adding `?`
}
