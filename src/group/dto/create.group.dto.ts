import { ArrayMinSize, IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: string;
  @IsArray()
  @ArrayMinSize(2)
  @IsMongoId({ each: true })
  users: string[];
  @IsString()
  image: string;
}
