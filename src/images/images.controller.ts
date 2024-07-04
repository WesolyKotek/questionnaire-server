import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Response } from 'express';
import { AdminGuard } from '../admin/admin.guard';
import { UserSurveyGuard } from '../survey/survey.guard';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('images')
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @ApiOperation({ summary: 'Загрузить изображение.' })
  @ApiBearerAuth()
  @Post(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('id', ParseIntPipe) surveyId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.imageService.uploadFile(file, surveyId);
  }

  @ApiOperation({ summary: 'Получить изображение в вопросе.' })
  @ApiNotFoundResponse({
    description: 'Image with filename ${filename} not found',
  })
  @ApiBearerAuth()
  @Get(':id/:filename')
  @UseGuards(UserSurveyGuard)
  async getImage(
    @Param('id', ParseIntPipe) surveyId: number,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = await this.imageService.getImage(surveyId, filename);
    res.sendFile(filePath);
  }
}
