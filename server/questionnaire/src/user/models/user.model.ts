import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  email: string;
  @Column
  password: string;
  @Column
  firstname: string;
  @Column
  lastname: string;
  @Column
  sex: number;
  @Column
  birthdate: Date;
  @Column({ defaultValue: 0 })
  admin: number;
  @Column({ defaultValue: Date.now() })
  lastlogin: Date;
}
