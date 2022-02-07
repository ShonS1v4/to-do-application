import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async createFiles(filesData): Promise<string[]> {
    try {
      const files = [];
      filesData.map((file) => {
        files.push(`http://localhost:${process.env.PORT}/${file.filename}`);
      });
      return files;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Error on loading data to disk, please try again',
        400,
      );
    }
  }
}
