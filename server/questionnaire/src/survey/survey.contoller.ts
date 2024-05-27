import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { AdminGuard } from '../admin/admin.guard';
import { SurveyService } from './survey.service';
import { UserSurveyGuard } from './survey.guard';
import { User } from '../user/decorators/user.decorator';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get('admin')
  @UseGuards(AdminGuard)
  findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  @UseGuards(UserSurveyGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.findById(id);
  }

  @Get(':id/start')
  @UseGuards(UserSurveyGuard)
  findSurveyAndQuestionsById(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.findSurveyPage(id);
  }

  @Get()
  findAccessible(@User() user) {
    return this.surveyService.findAccessibleSurveys(
      user.id,
      user.facultyDepartmentId,
    );
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.remove(id);
  }
}
