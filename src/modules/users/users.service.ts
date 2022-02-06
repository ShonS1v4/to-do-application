import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserDto } from './dto/user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private roleService: RolesService,
  ) {}

  public async create(dto: UserDto) {
    try {
      const user = await this.userRepo.create(dto);
      const role = await this.roleService.getRoleByValue('USER');
      await user.$set('roles', [role.id]);
      return user;
    } catch (e) {
      throw new HttpException(e.errors[0].message, 400);
    }
  }

  public async getAllUsers() {
    return await this.userRepo.findAll({ include: { all: true } });
  }
}
