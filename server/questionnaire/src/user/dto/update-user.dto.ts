import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  IsDate,
} from 'class-validator';

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
  readonly sex?: number;

  @IsDate()
  @IsOptional()
  readonly birthdate?: Date;

  @IsBoolean()
  @IsOptional()
  readonly admin?: boolean;

  @IsDate()
  @IsOptional()
  readonly lastlogin?: Date;
}
