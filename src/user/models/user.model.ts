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
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname: string;

  @ApiProperty({ enum: UserSexEnum, enumName: 'UserSexEnum' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sex: UserSexEnum;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  admin: boolean;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lastlogin: Date;

  @ApiProperty()
  @ForeignKey(() => FacultyDepartment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  facultyDepartmentId: number;

  @BelongsTo(() => FacultyDepartment)
  facultyDepartment: FacultyDepartment;
}
