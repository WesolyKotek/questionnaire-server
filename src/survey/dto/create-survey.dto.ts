import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: [Number] })
  readonly userAccess?: number[];

  @IsOptional()
  @IsJSON()
  @ApiProperty({ type: [Number] })
  readonly facultyAccess?: number[];
}
