import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createRole.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepo.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepo.findOne({ where: { value } });
  }
}
