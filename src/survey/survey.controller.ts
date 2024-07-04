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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiBearerAuth()
  @Get('admin')
  @UseGuards(AdminGuard)
  findAll() {
    return this.surveyService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(UserSurveyGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.findById(id);
  }

  @ApiBearerAuth()
  @Get(':id/start')
  @UseGuards(UserSurveyGuard)
  findSurveyAndQuestionsById(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.surveyService.findSurveyAndQuestions(user.id, id);
  }

  @ApiBearerAuth()
  @Get()
  findAccessible(@User() user) {
    return this.surveyService.findAccessibleSurveys(
      user.id,
      user.facultyDepartmentId,
    );
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AdminGuard)
  createSurvey(@Body() createSurvey: CreateSurvey) {
    return this.surveyService.createSurvey(createSurvey);
  }

  @ApiBearerAuth()
  @Post(':id/question')
  @UseGuards(AdminGuard)
  createQuestions(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuestion: CreateQuestion,
  ) {
    return this.surveyService.createQuestions(id, createQuestion);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(UserSurveyGuard)
  writeAnswers(@User() user, @Body() createUserAnswer: CreateUserAnswer) {
    return this.surveyService.saveUserAnswers(user.id, createUserAnswer);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurvey: UpdateSurvey,
  ) {
    return this.surveyService.update(id, updateSurvey);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.remove(id);
  }
}
