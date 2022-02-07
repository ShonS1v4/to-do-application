import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }

  @Post('/registration')
  registration(@Body() dto: UserDto) {
    return this.authService.registration(dto);
  }
}
