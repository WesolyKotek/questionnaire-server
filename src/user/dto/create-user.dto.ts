import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserSexEnum } from '../enums/user-sex.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ enum: UserSexEnum, enumName: 'UserSexEnum' })
  readonly sex: UserSexEnum;

  @IsDate()
  @IsNotEmpty()
  readonly birthdate: Date;

  @IsNumber()
  @IsOptional()
  readonly facultyDepartmentId: number;
}
