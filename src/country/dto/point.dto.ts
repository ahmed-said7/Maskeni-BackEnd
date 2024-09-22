import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class PointDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  coordinates: [number, number]; // Format: [longitude, latitude]
}
