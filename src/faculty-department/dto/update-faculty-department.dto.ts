import { IsOptional, IsString } from 'class-validator';

export class UpdateFacultyDepartment {
  @IsOptional()
  @IsString()
  readonly faculty?: string;

  @IsOptional()
  @IsString()
  readonly department?: string;
}
