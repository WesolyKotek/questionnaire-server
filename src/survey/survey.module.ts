import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Question } from './models/question.model';
import { Survey } from './models/survey.model';
import { UserAnswer } from './models/user-answer.model';
import { AnswerType } from './models/answer-type.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Survey, Question, UserAnswer, AnswerType]),
    UserModule,
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [SurveyService],
})
export class SurveyModule {}
