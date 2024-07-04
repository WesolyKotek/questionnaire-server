import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Question } from './question.model';
import { UserAnswer } from './user-answer.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Survey extends Model<Survey> {
  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  startDate: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationDate: Date;

  @ApiProperty({ type: [Number] })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  userAccess: number[];

  @ApiProperty({ type: [Number] })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  facultyAccess: number[];

  @HasMany(() => Question, { onDelete: 'CASCADE' })
  questions: Question[];

  @HasMany(() => UserAnswer, { onDelete: 'CASCADE' })
  userAnswers: UserAnswer[];
}
