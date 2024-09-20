import { PartialType } from '@nestjs/swagger';
import { CreateOfferedDto } from './create.service.dto';

export class UpdateOfferedDto extends PartialType(CreateOfferedDto) {}
