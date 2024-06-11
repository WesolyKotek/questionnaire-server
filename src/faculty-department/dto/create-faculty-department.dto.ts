import { IsString } from 'class-validator';

export class CreateFacultyDepartment {
  @IsString()
  readonly faculty: string;

  @IsString()
  readonly department: string;
}
