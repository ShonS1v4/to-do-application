import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from './helpers/fileName.helper';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  create(
    @Body() dto: CreateTaskDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.taskService.create(dto, files);
  }
}
