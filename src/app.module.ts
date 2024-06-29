import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { FacultyDepartmentModule } from './faculty-department/faculty-department.module';
import { SurveyModule } from './survey/survey.module';
import { join } from 'path';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UserModule,
    AuthModule,
    SurveyModule,
    FacultyDepartmentModule,
    ImagesModule,
  ],
})
export class AppModule {}
