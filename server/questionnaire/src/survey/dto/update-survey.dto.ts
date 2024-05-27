import { IsString, IsOptional, IsArray, IsObject } from 'class-validator';

export class UpdateSurveyDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  userAccess?: number[];

  @IsArray()
  @IsOptional()
  @IsObject({ each: true })
  facultyAccess?: number[];
}
