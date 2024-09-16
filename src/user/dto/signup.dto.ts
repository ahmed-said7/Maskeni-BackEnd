import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignupUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
  @ApiProperty()
  @IsString()
  mobile: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
