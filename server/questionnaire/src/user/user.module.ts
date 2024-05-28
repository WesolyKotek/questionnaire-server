import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserContoller } from './user.controller';
import { User } from './models/user.model';
import { FacultyDepartment } from 'src/faculty-department/models/faculty-department.model';

@Module({
  imports: [SequelizeModule.forFeature([User, FacultyDepartment])],
  providers: [UserService],
  controllers: [UserContoller],
  exports: [UserService],
})
export class UserModule {}
