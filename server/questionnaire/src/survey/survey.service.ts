import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Survey } from './models/survey.model';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Op } from 'sequelize';
import { Question } from './models/question.model';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey)
    private surveyModel: typeof Survey,
    private questionModel: typeof Question,
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

  async findSurveyPage(id: number): Promise<Survey> {
    const survey = await this.surveyModel.findByPk(id);
    if (!survey) {
      throw new NotFoundException(`Survey with id ${id} not found`);
    }
    //const questions = await this.questionModel.findByFk(id);

    return survey;
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const survey = new Survey({
      ...createSurveyDto,
    });
    return survey.save();
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    const survey = await this.findById(id);
    survey.update(updateSurveyDto);
    return survey;
  }

  async remove(id: number): Promise<void> {
    const survey = await this.findById(id);
    await survey.destroy();
  }

  async checkAccess(
    id: number,
    userId: number,
    facultyDepartmentId: number,
  ): Promise<boolean> {
    const survey = await this.findById(id);
    const { userAccess, facultyAccess } = survey;

    if (
      userAccess?.includes(userId) ||
      facultyAccess?.includes(facultyDepartmentId)
    ) {
      return true;
    }

    return false;
  }

  async findAccessibleSurveys(
    userId: number,
    facultyDepartmentId: number,
  ): Promise<Survey[]> {
    return this.surveyModel.findAll({
      where: {
        [Op.or]: [
          { userAccess: { [Op.contains]: [userId] } },
          { facultyAccess: { [Op.contains]: [facultyDepartmentId] } },
        ],
      },
    });
  }
}
