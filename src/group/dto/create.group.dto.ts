import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @ApiProperty({ description: 'The name of the group' })
  name: string;

  @ApiProperty({
    description: 'Array of MongoDB IDs representing the users in the group',
    type: [String],
    minItems: 2,
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsMongoId({ each: true })
  users: string[];

  @ApiProperty({
    description: 'MongoDB ID of the country where the group is located',
  })
  @IsMongoId()
  country: string;

  @ApiProperty({
    description: 'MongoDB ID of the city where the group is located',
  })
  @IsMongoId()
  city: string;

  @ApiProperty({
    description: 'MongoDB ID of the quarter where the group is located',
  })
  @IsMongoId()
  quarter: string;

  @ApiProperty({ description: 'URL of the image representing the group' })
  @IsString()
  image: string;
}
