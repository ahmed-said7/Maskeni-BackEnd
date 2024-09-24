import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    description: 'The mobile number of the admin for login.',
    example: '+1234567890', // Example value for better understanding
  })
  @IsNotEmpty()
  @IsString()
  mobile: string;

  @ApiProperty({
    description: 'The password of the admin account.',
    example: 'securepassword123', // Example value for better understanding
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
