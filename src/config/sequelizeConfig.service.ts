import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { EnumConfig } from './enumConfig/enumConfig';
import { User } from 'src/user/models/user.model';
import { Injectable } from '@nestjs/common';
import { FacultyDepartment } from 'src/faculty-department/models/faculty-department.model';
import { Question } from 'src/survey/models/question.model';
import { Survey } from 'src/survey/models/survey.model';
import { UserAnswer } from 'src/survey/models/user-answer.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      pg: { dialect, logging, host, port, username, password, database },
    } = this.configService.get(EnumConfig.DATABASE);

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [User, Survey, Question, UserAnswer, FacultyDepartment],
      autoLoadModels: true,
      synchronize: true,
    };
  }
}
