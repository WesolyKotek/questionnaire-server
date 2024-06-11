import { IsJSON, IsNumber } from 'class-validator';

export class CreateUserAnswer {
  @IsNumber()
  readonly surveyId: number;

  @IsJSON()
  readonly answers: {
    questionId: number;
    answer: any;
  }[];
}
