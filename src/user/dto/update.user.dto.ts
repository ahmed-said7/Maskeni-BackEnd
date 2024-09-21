import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
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
  bio: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fcm: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;
}

export class UpdateUserByAdminDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isBlocked: boolean;
}
