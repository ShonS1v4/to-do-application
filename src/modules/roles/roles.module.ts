import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Role } from './models/role.model';
import { UserRoles } from './models/userRoles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
