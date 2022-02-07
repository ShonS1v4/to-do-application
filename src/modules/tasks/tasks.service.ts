import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly TaskRepo: typeof Task,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreateTaskDto, filesData: any) {
    const files = await this.filesService.createFiles(filesData);
    return this.TaskRepo.create({ ...dto, files: files });
  }
}
