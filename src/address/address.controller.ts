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
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressQueryDto } from './dto/query.address.dto';
import { UpdateAddressDto } from './dto/update.address.dto';
import { CreateAddressDto } from './dto/create.address.dto';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    createAddressDto.user = req.userId;
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  findAll(@Query() query: AddressQueryDto, @Req() req: any) {
    return this.addressService.findAll(query, req.userId);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
