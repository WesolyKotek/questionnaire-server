import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class FacultyDepartment extends Model<FacultyDepartment> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  faculty: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  department: string;
}
