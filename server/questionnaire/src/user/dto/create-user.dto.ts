import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstname: string;

  @IsNotEmpty()
  readonly lastname: string;

  @IsNotEmpty()
  readonly sex: number;

  @IsNotEmpty()
  readonly birthdate: Date;
}
