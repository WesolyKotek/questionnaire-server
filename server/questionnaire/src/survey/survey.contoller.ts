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
import { CreateSurvey } from './dto/create-survey.dto';
import { UpdateSurvey } from './dto/update-survey.dto';
import { AdminGuard } from '../admin/admin.guard';
import { SurveyService } from './survey.service';
import { UserSurveyGuard } from './survey.guard';
import { User } from '../user/decorators/user.decorator';
import { CreateUserAnswer } from './dto/create-user-answer.dto';
import { CreateQuestion } from './dto/create-question.dto';

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
  findSurveyAndQuestionsById(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.surveyService.findSurveyAndQuestions(user.id, id);
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
  createSurvey(@Body() createSurvey: CreateSurvey) {
    return this.surveyService.createSurvey(createSurvey);
  }

  @Post(':id/question')
  @UseGuards(AdminGuard)
  createQuestions(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuestion: CreateQuestion,
  ) {
    return this.surveyService.createQuestions(id, createQuestion);
  }

  @Post()
  @UseGuards(UserSurveyGuard)
  writeAnswers(@User() user, @Body() createUserAnswer: CreateUserAnswer) {
    return this.surveyService.saveUserAnswers(user.id, createUserAnswer);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurvey: UpdateSurvey,
  ) {
    return this.surveyService.update(id, updateSurvey);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.remove(id);
  }
}
