import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsString()
  currentPassword: string;
}
