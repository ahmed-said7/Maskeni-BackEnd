import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isArchived: boolean;
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

  @IsString()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isDeleted: boolean;
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

  @IsString()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isAccepted: boolean;
}

export class DashboardUpdateArchivedDto {
  @IsString()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isArchived: boolean;
}

export class DashboardUpdateDeletedDto {
  @IsString()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isDeleted: boolean;
}

export class DashboardUpdateAcceptedDto {
  @IsString()
  @ApiPropertyOptional({
    description: 'Indicates if the item ',
  })
  @Transform(({ value }) => value === 'true' || value === true)
  isAccepted: boolean;
}
