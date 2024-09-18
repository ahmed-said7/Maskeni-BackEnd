import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
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

export class ForgetPassowrdBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'provide valid email address' })
  email: string;
}
