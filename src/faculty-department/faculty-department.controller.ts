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
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('facultyDepartment')
export class FacultyDepartmentController {
  constructor(
    private readonly facultyDepartmentService: FacultyDepartmentService,
  ) {}

  @ApiOperation({ summary: 'Получить все кафедры/факультеты.' })
  @Public()
  @Get()
  findAll() {
    return this.facultyDepartmentService.findAll();
  }

  @ApiOperation({
    summary: 'Получить информацию о кафедре/факультете по ID.',
  })
  @ApiNotFoundResponse({
    description: 'FacultyDepartment with id ${id} not found',
  })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AdminGuard)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.facultyDepartmentService.findById(id);
  }

  @ApiOperation({ summary: 'Создать новый факультет/направление.' })
  @ApiConflictResponse({
    description:
      'FacultyDepartment ${createFacultyDepartment.department} in ${createFacultyDepartment.faculty} already exists',
  })
  @ApiBearerAuth()
  @Post()
  @UseGuards(AdminGuard)
  createSurvey(@Body() createFacultyDepartment: CreateFacultyDepartment) {
    return this.facultyDepartmentService.create(createFacultyDepartment);
  }

  @ApiOperation({
    summary: 'Обновить данные существующего факультета/направления.',
  })
  @ApiNotFoundResponse({
    description: 'FacultyDepartment with id ${id} not found for update',
  })
  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultyDepartment: UpdateFacultyDepartment,
  ) {
    return this.facultyDepartmentService.update(id, updateFacultyDepartment);
  }

  @ApiOperation({ summary: 'Удалить кафедру/факультет.' })
  @ApiNotFoundResponse({
    description: 'FacultyDepartment with id ${id} not found for delete',
  })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.facultyDepartmentService.remove(id);
  }
}
