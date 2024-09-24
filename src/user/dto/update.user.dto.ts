import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The name of the user',
    minLength: 4, // Specifies the minimum length for validation
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  name?: string; // Marked as optional with a question mark

  @ApiPropertyOptional({
    description: 'The mobile phone number of the user',
    example: '+1234567890',
  })
  @IsOptional()
  @IsMobilePhone()
  mobile?: string;

  @ApiPropertyOptional({
    description: 'A short bio about the user',
    example: 'Software Developer from California',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    description: 'Firebase Cloud Messaging token for notifications',
    example: 'fcm_token_example',
  })
  @IsOptional()
  @IsString()
  fcm?: string;

  @ApiPropertyOptional({
    description: 'URL of the users profile icon',
    example: 'https://example.com/icon.png',
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiPropertyOptional({
    description: 'The email address of the user',
    example: 'johndoe@example.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'The gender of the user',
    example: 'Male',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: 'The birthday of the user in ISO date format',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString()
  birthday?: string;
}

export class UpdateUserByAdminDto {
  @ApiPropertyOptional({
    description:
      'Indicates whether the user is blocked. Set to true to block the user, false to unblock.',
    example: true, // Example value
  })
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean; // Marked as optional with a question mark
}
