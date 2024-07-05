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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiOperation({ summary: 'Получить все опросы.' })
  @ApiBearerAuth()
  @Get('admin')
  @UseGuards(AdminGuard)
  findAll() {
    return this.surveyService.findAll();
  }

  @ApiOperation({ summary: 'Получить опрос по его ID.' })
  @ApiNotFoundResponse({
    description: 'Survey with id ${id} not found',
  })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(UserSurveyGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.findById(id);
  }

  @ApiOperation({ summary: 'Получить статистику опроса по его ID.' })
  @ApiNotFoundResponse({
    description: 'Survey with id ${id} not found',
  })
  @ApiBearerAuth()
  @Get(':id/statistic')
  @UseGuards(AdminGuard)
  async getSurveyStatistic(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.getStatistic(id);
  }

  @ApiOperation({ summary: 'Получить опрос и его вопросы по ID опроса.' })
  @ApiNotFoundResponse({
    description: 'Survey with id ${id} not found',
  })
  @ApiForbiddenResponse({
    description: 'The survey has already been completed',
  })
  @ApiBearerAuth()
  @Get(':id/start')
  @UseGuards(UserSurveyGuard)
  findSurveyAndQuestionsById(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.surveyService.findSurveyAndQuestions(user.id, id);
  }

  @ApiOperation({ summary: 'Получить опросы, доступные пользователю.' })
  @ApiBearerAuth()
  @Get()
  findAccessible(@User() user) {
    return this.surveyService.findAccessibleSurveys(user.id, user.faculty);
  }

  @ApiOperation({ summary: 'Создать новый опрос.' })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AdminGuard)
  createSurvey(@Body() createSurvey: CreateSurvey) {
    return this.surveyService.createSurvey(createSurvey);
  }

  @ApiOperation({ summary: 'Добавить вопросы к опросу.' })
  @ApiBearerAuth()
  @Post(':id/question')
  @UseGuards(AdminGuard)
  createQuestions(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuestion: CreateQuestion,
  ) {
    return this.surveyService.createQuestions(id, createQuestion);
  }

  @ApiOperation({ summary: 'Ответить на вопросы опроса.' })
  @ApiForbiddenResponse({
    description: 'The survey has already been completed',
  })
  @ApiBearerAuth()
  @Post(':id/answer')
  @UseGuards(UserSurveyGuard)
  writeAnswers(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserAnswer: CreateUserAnswer,
  ) {
    return this.surveyService.saveUserAnswers(user.id, createUserAnswer);
  }

  @ApiOperation({ summary: 'Обновить существующий опрос.' })
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurvey: UpdateSurvey,
  ) {
    return this.surveyService.update(id, updateSurvey);
  }

  @ApiOperation({ summary: 'Удалить опрос.' })
  @ApiForbiddenResponse({
    description: 'Survey with id ${id} not found',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.surveyService.remove(id);
  }
}
