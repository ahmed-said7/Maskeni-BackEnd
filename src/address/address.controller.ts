import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressQueryDto } from './dto/query.address.dto';
import { UpdateAddressDto } from './dto/update.address.dto';
import { CreateAddressDto } from './dto/create.address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    createAddressDto.user = req.userId;
    return this.addressService.create(createAddressDto);
  }

  @Get()
  findAll(@Query() query: AddressQueryDto, @Req() req: any) {
    return this.addressService.findAll(query, req.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
