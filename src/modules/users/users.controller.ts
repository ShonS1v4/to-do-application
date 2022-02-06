import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './models/user.model';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

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
  @Get()
  getAll(): Promise<User[] | undefined> {
    return this.userService.getAllUsers();
  }
}
