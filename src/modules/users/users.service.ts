import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserDto } from './dto/user.dto';
import { RolesService } from '../roles/roles.service';
import { SetBanDto } from './dto/setBan.dto';
import { AddRoleDto } from './dto/addRole.dto';

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
      if (role) {
        await user.$set('roles', [role.id]);
        user.roles = [role];
      }
      return user;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }

  public async getAllUsers() {
    return await this.userRepo.findAll({ include: { all: true } });
  }

  public async getUserByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async setRole(dto: AddRoleDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', 404);
  }

  public async setBan(dto: SetBanDto) {
    const user = await this.userRepo.findByPk(dto.userId);
    if (!user) throw new HttpException('User not found', 404);
    user.banned = dto.banned;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
