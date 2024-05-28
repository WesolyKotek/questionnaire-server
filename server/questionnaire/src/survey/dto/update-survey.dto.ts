import { IsString, IsOptional, IsDate, IsJSON } from 'class-validator';

export class UpdateSurvey {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsDate()
  readonly startDate?: Date;

  @IsOptional()
  @IsDate()
  readonly expirationDate?: Date;

  @IsOptional()
  @IsJSON()
  readonly userAccess?: number[];

  @IsOptional()
  @IsJSON()
  readonly facultyAccess?: number[];
}
