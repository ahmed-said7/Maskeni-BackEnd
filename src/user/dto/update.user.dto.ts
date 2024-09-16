import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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
}

export class ForgetPassowrdBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'provide valid email address' })
  email: string;
}
