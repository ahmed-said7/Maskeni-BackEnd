import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  currentPassword: string;
}

export class changePasswordDto {
  @ApiProperty()
  @IsEmail()
  mobile: string;

  @ApiProperty()
  @IsString()
  password: string;
}
