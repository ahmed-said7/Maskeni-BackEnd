import { PartialType } from '@nestjs/mapped-types';
import { CreateQuarterDto } from './quarter.create.dto';

export class UpdateQuarterDto extends PartialType(CreateQuarterDto) {}
