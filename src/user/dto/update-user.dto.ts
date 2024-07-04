import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  IsDate,
} from 'class-validator';
import { UserSexEnum } from '../enums/user-sex.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUser {
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly firstname?: string;

  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ enum: UserSexEnum, enumName: 'UserSexEnum' })
  readonly sex?: UserSexEnum;

  @IsDate()
  @IsOptional()
  readonly birthdate?: Date;

  @IsBoolean()
  @IsOptional()
  readonly admin?: boolean;

  @IsDate()
  @IsOptional()
  readonly lastlogin?: Date;

  @IsNumber()
  @IsOptional()
  readonly facultyDepartmentId?: number;
}
