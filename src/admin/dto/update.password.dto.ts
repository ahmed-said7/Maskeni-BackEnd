import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description:
      'The new password for the user. Minimum length is 6 characters.',
    example: 'NewPass123', // Example value for better understanding
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The current password of the user for verification.',
    example: 'OldPass123', // Example value for better understanding
  })
  @IsString()
  currentPassword: string;
}
