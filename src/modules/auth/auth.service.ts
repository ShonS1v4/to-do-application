import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bc from 'bcryptjs';
import { User } from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: UserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: UserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) throw new HttpException('This email already taken', 400);
    const hashPassword = await bc.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: UserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) {
      const passwordLiquid = await bc.compare(dto.password, user.password);
      if (passwordLiquid) return user;
      throw new UnauthorizedException('Wrong password');
    }
    throw new UnauthorizedException('Wrong Username');
  }
}
