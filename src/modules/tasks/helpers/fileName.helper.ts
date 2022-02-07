import * as uuid from 'uuid';

export class Helper {
  static customFileName(req, file, cb) {
    console.log(file);
    const fileExtension = `${file.mimetype.split('/')[1]}`;
    const originalName = uuid.v4();
    cb(null, `${originalName}.${fileExtension}`);
  }

  static destinationPath(req, file, cb) {
    cb(null, './static/');
  }
}
