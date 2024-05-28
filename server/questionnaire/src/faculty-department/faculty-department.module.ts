import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FacultyDepartment } from './models/faculty-department.model';
import { FacultyDepartmentController } from './faculty-department.controller';
import { FacultyDepartmentService } from './faculty-department.service';

@Module({
  imports: [SequelizeModule.forFeature([FacultyDepartment])],
  providers: [FacultyDepartmentService],
  controllers: [FacultyDepartmentController],
  exports: [FacultyDepartmentService],
})
export class FacultyDepartmentModule {}
