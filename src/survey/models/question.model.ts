import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Survey } from './survey.model';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Question extends Model<Question> {
  @ApiProperty()
  @ForeignKey(() => Survey)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  surveyId: number;

  @BelongsTo(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

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

  @ApiProperty({ type: QuestionTypeEnum, enumName: 'QuestionTypeEnum' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionType: QuestionTypeEnum;

  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [{ type: 'number' }, { type: 'string' }],
    },
  })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  questionOptions: { optionCount: number; optionTitle: string }[]; // JSON формат вариантов ответа

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  maxAnswerCount: number;

  @ApiProperty({ type: [String] })
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  attachedImages: string[];
}
