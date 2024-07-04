import { IsJSON, IsNumber } from 'class-validator';
import { QuestionTypeEnum } from '../enums/question-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestion {
  @IsNumber()
  readonly surveyId: number;

  @IsJSON()
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        { type: 'number' },
        { type: 'string' },
        { type: 'string' },
        { type: 'QuestionTypeEnum' },
        {
          type: 'array',
          items: {
            oneOf: [{ type: 'number' }, { type: 'string' }],
          },
        },
        { type: 'number' },
        { type: 'string[]' },
      ],
    },
  })
  readonly questions: {
    readonly questionId: number;
    readonly title: string;
    readonly description?: string;
    readonly questionType: QuestionTypeEnum;
    readonly answerOptions?: { optionCount: number; optionTitle: string }[];
    readonly maxAnswerCount?: number;
    readonly attachedImages?: string[];
  }[];
}
