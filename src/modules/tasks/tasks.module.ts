import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { Task } from './models/task.model';
import { FilesModule } from '../files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature([User, Task]),
    MulterModule.register({
      dest: './static',
    }),
    FilesModule,
  ],
})
export class TasksModule {}
