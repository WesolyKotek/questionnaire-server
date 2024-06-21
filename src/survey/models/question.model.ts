import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Survey } from './survey.model';
import { AnswerTypeEnum } from '../enums/answer-type.enum';

@Table
export class Question extends Model<Question> {
  @ForeignKey(() => Survey)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  surveyId: number;

  @BelongsTo(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

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
    type: DataType.INTEGER,
    allowNull: false,
  })
  answerType: AnswerTypeEnum;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  answerOptions: { optionCount: number; optionTitle: string }[]; // JSON формат вариантов ответа

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  maxAnswerCount: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  attachedImages: string[];
}
