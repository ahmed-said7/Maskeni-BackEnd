import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class SignupAdminDto {
  @ApiProperty({
    description: 'The name of the admin user.',
    example: 'John Doe', // Example value for better understanding
  })
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({
    description: 'The mobile number of the admin user for registration.',
    example: '+1234567890', // Example value for better understanding
  })
  @IsString()
  mobile: string;

  @ApiProperty({
    description: 'The password for the admin account.',
    example: 'securepassword123', // Example value for better understanding
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: "An optional URL to the admin user's profile icon.",
    example: 'https://example.com/icon.png', // Example value for better understanding
  })
  @IsOptional()
  @IsString()
  icon: string;
}
