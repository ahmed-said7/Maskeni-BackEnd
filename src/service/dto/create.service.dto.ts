import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Jop_Type } from 'src/common/types';

export class CreateOfferedDto {
  @IsString()
  name: string;

  @IsString()
  details: string;

  @IsString()
  @IsEnum(Jop_Type)
  type: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  location: [number, number];

  @IsArray()
  @IsString({ each: true })
  images: string;

  user: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
