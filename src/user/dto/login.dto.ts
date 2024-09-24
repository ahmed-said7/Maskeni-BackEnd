import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMobilePhone } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The mobile number of the user for login',
    example: '+1234567890', // Example mobile number format
  })
  @IsString()
  @IsMobilePhone() // Optional: Validate mobile phone format
  mobile: string;
}
