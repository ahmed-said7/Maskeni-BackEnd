import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  // IsBooleanString,
  // IsBooleanString,
  IsNumber,
  IsOptional,
  // IsString,
} from 'class-validator';

export class DashboardSearchDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;
}

export class DashboardArchivedDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isArchived: string;
}

export class DashboardDeletedDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isDeleted: string;
}

export class DashboardAcceptedDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  page?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ description: 'Number of items per page' })
  limit?: number;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isAccepted: string;
}

export class DashboardUpdateArchivedDto {
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isArchived: string;
}

export class DashboardUpdateDeletedDto {
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isDeleted: string;
}

export class DashboardUpdateAcceptedDto {
  @IsBoolean()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isAccepted: string;
}
