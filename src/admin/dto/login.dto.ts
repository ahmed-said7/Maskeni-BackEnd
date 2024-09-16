import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobile: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
