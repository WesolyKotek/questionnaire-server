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
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('facultyDepartment')
export class FacultyDepartmentController {
  constructor(
    private readonly facultyDepartmentService: FacultyDepartmentService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.facultyDepartmentService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AdminGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.facultyDepartmentService.findById(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AdminGuard)
  createSurvey(@Body() createFacultyDepartment: CreateFacultyDepartment) {
    return this.facultyDepartmentService.create(createFacultyDepartment);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultyDepartment: UpdateFacultyDepartment,
  ) {
    return this.facultyDepartmentService.update(id, updateFacultyDepartment);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facultyDepartmentService.remove(id);
  }
}
