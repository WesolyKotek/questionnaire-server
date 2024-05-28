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
import { AdminGuard } from 'src/admin/admin.guard';
import { FacultyDepartmentService } from './faculty-department.service';
import { CreateFacultyDepartment } from './dto/create-faculty-department.dto';
import { UpdateFacultyDepartment } from './dto/update-faculty-department.dto';

@Controller('facultyDepartment')
export class FacultyDepartmentController {
  constructor(
    private readonly facultyDepartmentService: FacultyDepartmentService,
  ) {}

  @Get(':id')
  @UseGuards(AdminGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.facultyDepartmentService.findById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  createSurvey(@Body() createFacultyDepartment: CreateFacultyDepartment) {
    return this.facultyDepartmentService.create(createFacultyDepartment);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultyDepartment: UpdateFacultyDepartment,
  ) {
    return this.facultyDepartmentService.update(id, updateFacultyDepartment);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facultyDepartmentService.remove(id);
  }
}
