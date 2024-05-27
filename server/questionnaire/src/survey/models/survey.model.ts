import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Survey extends Model<Survey> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationDate: Date;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  userAccess: number[];

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  facultyAccess: number[];
}
