import { InjectModel } from '@nestjs/sequelize';
import {
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { FacultyDepartment } from './models/faculty-department.model';
import { UpdateFacultyDepartment } from './dto/update-faculty-department.dto';
import { CreateFacultyDepartment } from './dto/create-faculty-department.dto';

@Injectable()
export class FacultyDepartmentService {
  private readonly logger = new Logger(FacultyDepartmentService.name);

  constructor(
    @InjectModel(FacultyDepartment)
    private facultyDepartmentModel: typeof FacultyDepartment,
  ) {}

  async findById(id: number): Promise<FacultyDepartment> {
    const facultyDepartment = await this.facultyDepartmentModel.findByPk(id);

    if (!facultyDepartment) {
      this.logger.warn(`FacultyDepartment with id ${id} not found`);
      throw new NotFoundException(`FacultyDepartment with id ${id} not found`);
    }
    return facultyDepartment;
  }

  async create(
    createFacultyDepartment: CreateFacultyDepartment,
  ): Promise<FacultyDepartment> {
    const existingFacultyDepartment = await this.facultyDepartmentModel.findOne(
      {
        where: {
          faculty: createFacultyDepartment.faculty,
          department: createFacultyDepartment.department,
        },
      },
    );

    if (existingFacultyDepartment) {
      this.logger.warn(
        `FacultyDepartment ${createFacultyDepartment.department} in ${createFacultyDepartment.faculty} already exists`,
      );
      throw new ConflictException(
        `FacultyDepartment ${createFacultyDepartment.department} in ${createFacultyDepartment.faculty} already exists`,
      );
    }

    const facultyDepartment = await this.facultyDepartmentModel.create({
      ...createFacultyDepartment,
    });
    return facultyDepartment;
  }

  async update(
    id: number,
    updateFacultyDepartment: UpdateFacultyDepartment,
  ): Promise<[number, UpdateFacultyDepartment[]]> {
    const [affectedCount, affectedRows] =
      await this.facultyDepartmentModel.update(
        { ...updateFacultyDepartment },
        {
          where: { id },
          returning: true,
        },
      );

    if (affectedCount === 0) {
      this.logger.warn(`FacultyDepartment with id ${id} not found for update`);
      throw new NotFoundException(
        `FacultyDepartment with id ${id} not found for update`,
      );
    }

    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      this.logger.warn(`FacultyDepartment with id ${id} not found for delete`);
      throw new NotFoundException(
        `FacultyDepartment with id ${id} not found for delete`,
      );
    }
    await user.destroy();
  }
}
