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
  })
  @IsJSON()
  readonly answers: {
    questionId: number;
    answer: any;
  }[];
}
