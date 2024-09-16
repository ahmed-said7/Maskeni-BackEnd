import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class SignupAdminDto {
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
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  icon: string;
}
