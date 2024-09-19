import { PartialType } from '@nestjs/swagger';
import { CreateVoluntaryDto } from './voluntary.create.dto';

export class UpdateVoluntaryDto extends PartialType(CreateVoluntaryDto) {}
