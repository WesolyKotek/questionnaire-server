import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class AnswerType extends Model<AnswerType> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;
}
