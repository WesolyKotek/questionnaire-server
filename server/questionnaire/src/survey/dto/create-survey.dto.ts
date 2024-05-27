import { IsString, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  userAccess?: number[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  facultyAccess?: number[];
}
