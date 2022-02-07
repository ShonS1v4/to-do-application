import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AddRoleDto } from './dto/addRole.dto';
import { SetBanDto } from './dto/setBan.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ description: 'Create new user' })
  @ApiOkResponse({ status: 201, type: User })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() userDto: UserDto): Promise<User | undefined> {
    return this.userService.create(userDto);
  }

  @ApiOperation({ description: 'Get all registered users' })
  @ApiOkResponse({ status: 200, type: [User] })
  @ApiBadRequestResponse()
  @UseGuards(JwtGuard)
  @Get()
  getAll(): Promise<User[] | undefined> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ description: 'Add role to user' })
  @ApiOkResponse({ status: 200, type: [User] })
  @ApiBadRequestResponse()
  @roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/setRole')
  setRole(@Body() dto: AddRoleDto): Promise<AddRoleDto | undefined> {
    console.log('im here');
    return this.userService.setRole(dto);
  }

  @ApiOperation({ description: 'Give ban to user' })
  @ApiOkResponse({ status: 200, type: [User] })
  @ApiBadRequestResponse()
  @roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/setBan')
  setBan(@Body() dto: SetBanDto): Promise<User | undefined> {
    return this.userService.setBan(dto);
  }
}
