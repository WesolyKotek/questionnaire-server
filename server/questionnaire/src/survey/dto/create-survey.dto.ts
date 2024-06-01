import { IsString, IsOptional, IsDate, IsJSON } from 'class-validator';

export class CreateSurvey {
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly expirationDate: Date;

  @IsOptional()
  @IsJSON()
  readonly userAccess?: number[];

  @IsOptional()
  @IsJSON()
  readonly facultyAccess?: number[];
}
