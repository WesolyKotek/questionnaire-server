import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNumber } from 'class-validator';

export class CreateUserAnswer {
  @IsNumber()
  readonly surveyId: number;

  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [{ type: 'number' }, { type: 'any' }],
    },
    example: [
      [0, 'answer0'],
      [1, 'answer1'],
    ],
  })
  @IsJSON()
  readonly answers: {
    questionId: number;
    answer: any;
  }[];
}
