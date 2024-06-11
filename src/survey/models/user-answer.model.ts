import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Survey } from './survey.model';
import { Question } from './question.model';
import { User } from 'src/user/models/user.model';

@Table
export class UserAnswer extends Model<UserAnswer> {
  @ForeignKey(() => Survey)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  surveyId: number;

  @BelongsTo(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

  @BelongsTo(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  answer: any;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  submittedAt: Date;
}
