import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../users/models/user.model';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/createRole.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}

  @ApiOperation({ description: 'Create new role' })
  @ApiOkResponse({ status: 201, type: Role })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.create(roleDto);
  }

  @ApiOperation({ description: 'Get role by value' })
  @ApiOkResponse({ status: 201, type: User })
  @ApiBadRequestResponse()
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
