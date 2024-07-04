import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class FacultyDepartment extends Model<FacultyDepartment> {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  faculty: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  department: string;
}
