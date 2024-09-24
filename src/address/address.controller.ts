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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Address') // Tagging the controller for Swagger
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    status: 201,
    description: 'The address has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: any) {
    createAddressDto.user = req.userId;
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Retrieve all addresses' })
  @ApiResponse({
    status: 200,
    description: 'Successful retrieval of addresses.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(@Query() query: AddressQueryDto, @Req() req: any) {
    return this.addressService.findAll(query, req.userId);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update an existing address' })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete an address' })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.addressService.remove(id);
  }
}
