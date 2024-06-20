import { IsJSON, IsNumber } from 'class-validator';
import { AnswerTypeEnum } from '../enums/answer-type.enum';

export class CreateQuestion {
  @IsNumber()
  readonly surveyId: number;

  @IsJSON()
  readonly questions: {
    readonly questionId: number;
    readonly title: string;
    readonly description?: string;
    readonly answerType: AnswerTypeEnum;
    readonly answerOptions?: { optionCount: number; optionTitle: string }[];
    readonly maxAnswerCount?: number;
    readonly attachedImages?: string[];
  }[];
}
