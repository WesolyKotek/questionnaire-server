import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Survey } from './models/survey.model';
import { CreateSurvey } from './dto/create-survey.dto';
import { UpdateSurvey } from './dto/update-survey.dto';
import { Op } from 'sequelize';
import { Question } from './models/question.model';
import { CreateUserAnswer } from './dto/create-user-answer.dto';
import { UserAnswer } from './models/user-answer.model';
import { CreateQuestion } from './dto/create-question.dto';
import { User } from 'src/user/models/user.model';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey)
    private surveyModel: typeof Survey,
    @InjectModel(Question)
    private questionModel: typeof Question,
    @InjectModel(UserAnswer)
    private userAnswerModel: typeof UserAnswer,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<Survey[]> {
    return this.surveyModel.findAll();
  }

  async findById(id: number): Promise<Survey> {
    const survey = await this.surveyModel.findByPk(id);
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    return survey;
  }

  async getStatistic(id: number) {
    const survey = await this.surveyModel.findByPk(id);

    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    const totalUsers = await this.userModel.count({
      where: {
        [Op.or]: [
          { id: { [Op.in]: survey.userAccess } },
          {
            facultyDepartmentId: {
              [Op.and]: [{ [Op.in]: survey.facultyAccess }, { [Op.ne]: null }],
            },
          },
        ],
      },
    });

    const passedUsersCount = await this.userAnswerModel.count({
      where: { surveyId: id },
      group: ['userId'],
    });

    const passedUsers = await this.userAnswerModel.findAll({
      where: { surveyId: id },
      attributes: ['userId'],
      group: ['userId'],
    });

    const passedUserIds = passedUsers.map((userAnswer) => userAnswer.userId);

    const departments = survey.facultyAccess;
    const departmentStats = [];

    for (const departmentId of departments) {
      const departmentUsersCount = await this.userModel.count({
        where: { facultyDepartmentId: departmentId },
      });

      const departmentPassedUsersCount = await this.userAnswerModel.count({
        where: {
          surveyId: id,
          userId: { [Op.in]: passedUserIds },
          '$user.facultyDepartmentId$': departmentId,
        },
        include: [{ model: User, attributes: [] }],
      });

      departmentStats.push({
        departmentId,
        passedUsers: departmentPassedUsersCount,
        notPassedUsers: departmentUsersCount - departmentPassedUsersCount,
      });
    }

    return {
      totalUsers,
      passedUsers: passedUsersCount.length,
      notPassedUsers: totalUsers - passedUsersCount.length,
      departmentStats,
    };
  }

  async findSurveyAndQuestions(
    userId: number,
    id: number,
  ): Promise<{ survey: Survey; questions: Question[] }> {
    const survey = await this.surveyModel.findByPk(id);

    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }

    const surveyAlreadyPassed = await this.checkSurveyPassed(userId, id);
    if (surveyAlreadyPassed) {
      throw new ForbiddenException('The survey has already been completed');
    }

    const now = new Date();
    if (
      now < new Date(survey.startDate) ||
      now > new Date(survey.expirationDate)
    ) {
      throw new ForbiddenException(
        'Survey is either not started yet or has already ended',
      );
    }

    const questions = await this.questionModel.findAll({
      where: { surveyId: id },
    });

    return { survey, questions };
  }

  async saveUserAnswers(
    userId: number,
    createUserAnswer: CreateUserAnswer,
  ): Promise<boolean> {
    const { surveyId, answers } = createUserAnswer;

    const surveyAlreadyPassed = await this.checkSurveyPassed(userId, surveyId);
    if (surveyAlreadyPassed) {
      throw new ForbiddenException('The survey has already been completed');
    }

    for (const answer of answers) {
      await this.userAnswerModel.create({
        surveyId,
        questionId: answer.questionId,
        userId,
        answer: answer.answer,
        submittedAt: new Date(),
      });
    }

    return true;
  }

  async checkSurveyPassed(userId: number, surveyId: number): Promise<boolean> {
    const userAnswers = await this.userAnswerModel.findAll({
      where: {
        userId,
        surveyId,
      },
    });

    return userAnswers.length > 0;
  }

  async createSurvey(createSurvey: CreateSurvey): Promise<Survey> {
    const survey = new Survey({
      ...createSurvey,
    });
    return survey.save();
  }

  async createQuestions(
    surveyId: number,
    createQuestion: CreateQuestion,
  ): Promise<boolean> {
    const { questions } = createQuestion;
    for (const question of questions) {
      await this.questionModel.create({
        surveyId,
        ...question,
      });
    }

    return true;
  }

  async update(id: number, updateSurvey: UpdateSurvey): Promise<Survey> {
    const survey = await this.findById(id);
    survey.update(updateSurvey);
    return survey;
  }

  async remove(id: number): Promise<void> {
    const survey = await this.surveyModel.findByPk(id, {
      include: [Question, UserAnswer],
    });
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    await survey.destroy();
  }

  async checkAccess(
    id: number,
    userId: number,
    facultyDepartmentId: number | null,
  ): Promise<boolean> {
    const survey = await this.findById(id);
    const { userAccess, facultyAccess } = survey;

    const userHasAccess = userAccess?.includes(userId);

    const facultyHasAccess =
      facultyDepartmentId !== null
        ? facultyAccess?.includes(facultyDepartmentId)
        : false;

    return userHasAccess || facultyHasAccess;
  }

  async findAccessibleSurveys(
    userId: number,
    facultyDepartmentId: number | null,
  ): Promise<Survey[]> {
    const whereConditions: any[] = [
      { userAccess: { [Op.contains]: [userId] } },
    ];

    if (facultyDepartmentId !== null) {
      whereConditions.push({
        facultyAccess: { [Op.contains]: [facultyDepartmentId] },
      });
    }

    const surveys = await this.surveyModel.findAll({
      where: {
        [Op.or]: whereConditions,
      },
    });

    return surveys;
  }
}
