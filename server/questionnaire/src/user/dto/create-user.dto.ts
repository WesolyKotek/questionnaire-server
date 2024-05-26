import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNotEmpty()
  readonly sex: number;

  @IsNotEmpty()
  readonly birthdate: Date;
}
