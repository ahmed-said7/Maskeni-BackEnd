import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  @IsMongoId({ each: true })
  users: string[];
  @ApiProperty()
  @IsString()
  image: string;
}
