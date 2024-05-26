import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUser {
  @IsEmail()
  readonly email: string;

  password: string;

  readonly firstname: string;

  readonly lastname: string;

  readonly sex: number;

  readonly birthdate: Date;

  readonly admin: number;

  readonly lastlogin: Date;
}
