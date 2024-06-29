import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
  async uploadFile(
    file: Express.Multer.File,
    surveyId: number,
  ): Promise<string> {
    const uploadPath = path.join('./uploads', surveyId.toString());
    const filename = `${Date.now()}-${file.originalname}`;
    const fullPath = path.join(uploadPath, filename);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    fs.writeFileSync(fullPath, file.buffer);

    return path.join('/uploads', surveyId.toString(), filename);
  }

  async getImage(surveyId: number, filename: string): Promise<string> {
    const filePath = path.join(
      process.cwd(),
      'uploads',
      surveyId.toString(),
      filename,
    );
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Image with filename ${filename} not found`);
    }
    return filePath;
  }
}
