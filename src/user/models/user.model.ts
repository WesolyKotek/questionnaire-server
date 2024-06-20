import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { FacultyDepartment } from 'src/faculty-department/models/faculty-department.model';
import { UserSexEnum } from '../enums/user-sex.enum';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sex: UserSexEnum;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  admin: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lastlogin: Date;

  @ForeignKey(() => FacultyDepartment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  facultyDepartmentId: number;

  @BelongsTo(() => FacultyDepartment)
  facultyDepartment: FacultyDepartment;
}
